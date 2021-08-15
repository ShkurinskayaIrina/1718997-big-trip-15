import { TYPES_SORT } from '../data.js';
import { createElement } from '../utils/render.js';

const tripSort = () => TYPES_SORT.map((type) =>
  `<div class="trip-sort__item  trip-sort__item--${type.toLowerCase()}">
    <input id="sort-${type.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type.toLowerCase()}" ${type.toLowerCase()==='day'? 'checked': ''}>
    <label class="trip-sort__btn" for="sort-${type}">${type}</label>
  </div>`).join('');

export const showSortTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${tripSort()}
  </form>`;

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return showSortTemplate();
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
