import { TextDependFilter } from '../data.js';
import AbstractView from '../view/abstract.js';

const tripFilters = () => Object.keys(TextDependFilter).map((filter) =>
  `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === 'everything' ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`).join('');


export const showFiltersTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
    ${tripFilters()}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class Filters extends AbstractView {
  getTemplate() {
    return showFiltersTemplate();
  }
}
