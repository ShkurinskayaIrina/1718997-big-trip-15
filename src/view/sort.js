import { SortTypes } from '../data.js';
import AbstractView from '../view/abstract.js';

const tripSort = (sortType) => Object.keys(SortTypes).map((type) =>
  `<div class="trip-sort__item  trip-sort__item--${type.toLowerCase()}">
    <input id="sort-${type.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type.toLowerCase()}" ${type.toLowerCase()===sortType.toLowerCase() ? 'checked' : ''}>
    <label class="trip-sort__btn" data-sort-type="${type.toLowerCase()}" for="sort-${type.toLowerCase()}">${type}</label>
  </div>`).join('');


export const showSortTemplate = (sortType) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${tripSort(sortType)}
  </form>`;
export default class Sort extends AbstractView {
  constructor(SortType) {
    super();
    this._sortType = SortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return showSortTemplate(this._sortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this._sortType = evt.target.dataset.sortType;
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}


