import AbstractView from '../view/abstract.js';

const createEventsListTemplate = () =>
  `<ul class="trip-events__list">
  </ul>`;

export default class EventsList extends AbstractView {
  getTemplate() {
    return createEventsListTemplate();
  }
}
