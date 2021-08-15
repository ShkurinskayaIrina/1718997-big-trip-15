import { createElement } from '../utils/render.js';

export const showEventsListTemplate = () =>
  `<ul class="trip-events__list">
    </li>
  </ul>`;

export default class EventsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return showEventsListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
