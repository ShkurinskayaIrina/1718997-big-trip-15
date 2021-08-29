import { remove, render, RenderPosition } from '../utils/render.js';
import { sortPrice,  sortTime } from '../utils/trip.js'; //sortEvent, sortOffers
import { updateItem } from '../mock/mock-utils.js';
import { SortTypes } from '../data.js';


import SortView from '../view/sort.js';
import NoEventView from '../view/no-event.js';
import EventsListView from '../view/events-list.js';

import EventPresenter from './event.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._currentSortType = SortTypes.DAY;
    this._sortComponent = new SortView(this._currentSortType);
    this._noEventComponent = new NoEventView();
    this._eventListComponent = new EventsListView();

    this._eventPresenter = new Map();
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();
    this._renderTrip();
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._sourcedTripEvents = updateItem(this._sourcedTripEvents, updatedEvent);
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    remove(this._sortComponent);
    this._sortEvents(sortType);
    this._renderSort();
    this._clearEventList();
    this._renderEventList();
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortTypes.DAY.toLowerCase():
        this._tripEvents = this._sourcedTripEvents.slice();
        this._currentSortType = sortType;
        break;
      // case SortTypes.EVENT.toLowerCase():
      //   this._tripEvents.sort(sortEvent);
      //   break;
      case SortTypes.TIME.toLowerCase():
        this._tripEvents.sort(sortTime);
        this._currentSortType = sortType;
        break;
      case SortTypes.PRICE.toLowerCase():
        this._tripEvents.sort(sortPrice);
        this._currentSortType = sortType;
        break;
      // case SortTypes.OFFERS.toLowerCase():
      //   this._tripEvents.sort(sortOffers);
      //   break;
    }

    // this._currentSortType = sortType;
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    this._sortComponent = new SortView(this._currentSortType);
    render(this._tripContainer, this._sortComponent, 'beforeend');
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEventList() {
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);
    this._renderEvents();
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(tripEvent) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(tripEvent);
    this._eventPresenter.set(tripEvent.id, eventPresenter);
  }

  _renderEvents() {
    this._tripEvents.forEach((tripEvent) => this._renderEvent(tripEvent));
  }

  _renderTrip() {
    // Метод для инициализации (начала работы) модуля
    if (!this._tripEvents.length) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventList();
  }

  _clearEventList() {
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();
  }
}
