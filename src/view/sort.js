import { SortTypes } from '../data.js';
import AbstractView from '../view/abstract.js';

const getProperty = (sortType, type) => {
  if (type === SortTypes.EVENT || type === SortTypes.OFFERS){
    return 'disabled';
  }

  if (type === sortType) {
    return 'checked';
  }
};

const tripSort = (sortType) => Object.values(SortTypes).map((type) =>
  `<div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${getProperty(sortType, type)}>
    <label class="trip-sort__btn" data-sort-type="${type}" for="sort-${type}">${type}</label>
  </div>`).join('');

export const showSortTemplate = (sortType) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${tripSort(sortType)}
  </form>`;
export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return showSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this._currentSortType = evt.target.dataset.sortType;
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}


