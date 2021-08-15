import { createElement } from '../utils/render.js';

const showNoEventTemplate = () => (
  //привязать фразу к типу фильтра
  //что-то с классом, фразу скрывает
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoEvent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return showNoEventTemplate();
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
