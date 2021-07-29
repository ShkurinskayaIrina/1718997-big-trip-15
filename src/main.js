import { createSiteMenuTemplate } from './view/menu.js';
import { createFilterMenuTemplate } from './view/filter.js';
import { createSiteSortTemplate } from './view/sort.js';
import { createEventListTemplate } from './view/event-list.js';
import { createTripEventsItemTemplate } from './view/event-item.js';
const TASK_COUNT = 3;
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMenuElement = document.querySelector('.trip-controls__navigation');
render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');

const siteFiltersElement = document.querySelector('.trip-controls__filters');
render(siteFiltersElement, createFilterMenuTemplate(), 'beforeend');

const siteMainElement = document.querySelector('main').querySelector('.trip-events');
render(siteMainElement, createSiteSortTemplate(), 'beforeend');
render(siteMainElement, createEventListTemplate(), 'beforeend');
for (let i = 0; i < TASK_COUNT; i++) {
  render(siteMainElement, createTripEventsItemTemplate(), 'beforeend');
}


