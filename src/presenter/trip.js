import { remove, render, RenderPosition } from '../utils/render.js';
import { sortDateDown, sortPrice,  sortTime, filter } from '../utils/trip.js';
import { SortTypes, UserAction, UpdateType, FilterType } from '../const.js';

import SortView from '../view/sort.js';
import NoEventView from '../view/no-event.js';
import EventsListView from '../view/events-list.js';
import LoadingView from '../view/loading.js';

import EventPresenter, {State as EventPresenterViewState} from './event.js';

import EventNewPresenter from './event-new.js';

export default class Trip {
  constructor(tripContainer, eventsModel, filterModel, api) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._currentSortType = SortTypes.DAY;
    this._isLoading = true;
    this._api = api;

    this._sortComponent = null;
    this._noTaskComponent = null;

    this._noEventComponent = new NoEventView();
    this._eventListComponent = new EventsListView();
    this._loadingComponent = new LoadingView();

    this._eventPresenter = new Map();
    this._filterType = FilterType.EVERYTHING;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._eventListComponent, this._handleViewAction);
  }

  init() {
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});
    remove(this._eventListComponent);
    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(callback) {
    this._currentSortType = SortTypes.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventNewPresenter.init(callback);
  }

  _getEvents() {
    this._filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[this._filterType](events);
    switch (this._currentSortType) {
      case SortTypes.DAY:
        return filtredEvents.sort(sortDateDown);
      case SortTypes.TIME:
        return filtredEvents.sort(sortTime);
      case SortTypes.PRICE:
        return filtredEvents.sort(sortPrice);
    }
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        // this._eventsModel.updateEvent(updateType, update);
        this._eventPresenter.get(update.id).setViewState(EventPresenterViewState.SAVING);
        this._api.updateEvent(update)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          }).catch(() => {
            this._eventPresenter.get(update.id).setViewState(EventPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_EVENT:
        this._eventNewPresenter.setSaving();
        this._api.addEvent(update)
          .then((response) => {
            this._eventsModel.addEvent(updateType, response);
          }).catch(() => {
            this._eventNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenter.get(update.id).setViewState(EventPresenterViewState.DELETING);
        this._api.deleteEvent(update)
          .then(() => {
            this._eventsModel.deleteEvent(updateType, update);
          }).catch(() => {
            this._eventPresenter.get(update.id).setViewState(EventPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда изменились данные, касающиеся тек фильтрации)
    // - обновить весь список (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        //обновить часть списка (например, когда поменялось описание)
        this._eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        //обновить список (например, когда изменилась дата события)
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        //обновить весь список (например, при переключении фильтра)
        // this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType  || sortType === SortTypes.EVENT || sortType === SortTypes.OFFERS) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  // _renderEventList() {
  // //   render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);
  // //   this._renderEvents();
  //   const events = this._getEvents();
  //   this._renderEvents(events);
  // }

  _clearTrip({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();

    remove(this._sortComponent);
    remove(this._noEventComponent);

    if (resetSortType) {
      // ссбрасывает сортировку при переключении фильтров (пункт 1.7 ТЗ)
      this._currentSortType = SortTypes.DAY;
    }
  }

  _renderNoEvents() {
    this._noEventComponent = new NoEventView(this._filterType);
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(tripEvent) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleViewAction, this._handleModeChange, this._currentSortType);
    eventPresenter.init(tripEvent);
    this._eventPresenter.set(tripEvent.id, eventPresenter);
  }

  _renderEvents(events) {
    // this._tripEvents.forEach((tripEvent) => this._renderEvent(tripEvent));
    events.forEach((tripEvent) => this._renderEvent(tripEvent));
  }

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    // Метод для инициализации (начала работы) модуля
    const events = this._getEvents();

    const eventCount = events.length;
    if (eventCount === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEvents(events);
  }
}
