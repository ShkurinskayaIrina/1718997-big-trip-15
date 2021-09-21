import { FilterType } from '../const.js';
import AbstractView from '../view/abstract.js';

const tripFilters = (currentFilterType) =>
  Object.values(FilterType).map((filter) => `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`).join('');


export const showFiltersTemplate = (currentFilterType) =>
  `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${tripFilters(currentFilterType)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`;
export default class Filters extends AbstractView {
  // constructor(filters, currentFilterType) {
  constructor(currentFilterType) {
    super();
    // this._filters = filters;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return showFiltersTemplate(this._currentFilter);
    // return showFiltersTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}

