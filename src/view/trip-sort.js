import { TYPES_SORT } from '../data.js';

const TripSort = () => TYPES_SORT.map((type) =>
  ` <div class="trip-sort__item  trip-sort__item--${type.toLowerCase()}">
      <input id="sort-${type.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type.toLowerCase()}" ${type.toLowerCase()==='day'? 'checked': ''}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`).join('');

export const showTripSortTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${TripSort()}
  </form>`;

