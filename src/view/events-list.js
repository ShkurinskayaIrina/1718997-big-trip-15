import AbstractView from '../view/abstract.js';

export const showEventsListTemplate = () =>
  `<ul class="trip-events__list">
  </ul>`;

export default class EventsList extends AbstractView {
  getTemplate() {
    return showEventsListTemplate();
  }
}
