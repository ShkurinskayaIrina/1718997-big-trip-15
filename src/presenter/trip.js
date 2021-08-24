import { render, RenderPosition } from '../utils/render.js';
import { updateItem } from '../mock/mock-utils.js';
import SortView from '../view/sort.js';
import NoEventView from '../view/no-event.js';
import EventsListView from '../view/events-list.js';

import EventPresenter from './event.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._sortComponent = new SortView();
    this._noEventComponent = new NoEventView();
    this._eventListComponent = new EventsListView();

    this._eventPresenter = new Map();
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._renderTrip();
  }

  _handleEventChange(updatedEvent) {
    this._boardTasks = updateItem(this._tripEvents, updatedEvent);
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._tripContainer, this._sortComponent, 'beforeend');
  }

  _renderEventList() {
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);
    this._renderEvents();
  }

  _clearEventList() {
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();
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
}
