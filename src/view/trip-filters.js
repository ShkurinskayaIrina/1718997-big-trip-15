import { FILTERS } from '../data.js';

const tripFilters = () => FILTERS.map((filter) =>
  ` <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === 'everything' ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`).join('');

export const showTripFiltersTemplate = () => `
  <form class="trip-filters" action="#" method="get">
    ${tripFilters()}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `;

