import { INFO_MAIN_NULL } from './data.js';
import { generateArrayMockPoints } from './mock/mock-utils.js';
import { sortTripEvents, render, generateTripInfoMain} from './utils.js';
import { showTripInfoTemplate } from './view/trip-info.js';
import { showTripTabsTemplate } from './view/trip-tabs.js';
import { showTripFiltersTemplate } from './view/trip-filters.js';
import { showTripSortTemplate } from './view/trip-sort.js';
import { showTripEventsListTemplate } from './view/trip-event-list.js';
import { showTripEventsItemTemplate } from './view/trip-event-item.js';
import { QUANTITY_POINTS } from './mock/mock-data.js';
const tripEvents = generateArrayMockPoints();
const tripEventsSortByDate = tripEvents.slice().sort(sortTripEvents);

console.log(tripEventsSortByDate);

let infoMain = INFO_MAIN_NULL;
if (tripEventsSortByDate.length > 0) {
  infoMain = generateTripInfoMain(tripEventsSortByDate);
}

const tripMainBlock = document.querySelector('.trip-main');
render(tripMainBlock, showTripInfoTemplate(infoMain), 'afterbegin');

const tripControlsNavigationBlock = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigationBlock, showTripTabsTemplate(), 'beforeend');

const tripControlsFiltersBlock = document.querySelector('.trip-controls__filters');
render(tripControlsFiltersBlock, showTripFiltersTemplate(), 'beforeend');

const tripEventsBlock = document.querySelector('main').querySelector('.trip-events');
render(tripEventsBlock, showTripSortTemplate(), 'beforeend');

render(tripEventsBlock, showTripEventsListTemplate(tripEventsSortByDate[0]), 'beforeend');

const siteTripEventsList = document.querySelector('.trip-events__list');

for (let i = 1; i < QUANTITY_POINTS; i++) {
  render(siteTripEventsList, showTripEventsItemTemplate(tripEventsSortByDate[i]), 'beforeend');
}
