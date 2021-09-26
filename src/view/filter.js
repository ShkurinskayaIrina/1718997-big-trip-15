import { FilterType, MenuItem } from '../const.js';
import AbstractView from '../view/abstract.js';

const createFilterTypeTemplate = (currentFilterType, menuItem) =>
  Object.values(FilterType).map((filter) => `<div class="trip-filters__filter">
    <input id="filter-${filter}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio" name="trip-filter"
      value="${filter}"
      ${filter === currentFilterType ? 'checked' : ''}
      ${menuItem === MenuItem.STATS ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`).join('');


const createFiltersTemplate = (currentFilterType, menuItem) =>
  `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${createFilterTypeTemplate(currentFilterType, menuItem)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`;
export default class Filters extends AbstractView {
  constructor(currentFilterType, menuItem) {
    super();
    this._menuItem = menuItem;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._currentFilter, this._menuItem);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}

