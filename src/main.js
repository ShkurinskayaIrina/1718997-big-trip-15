// import { createSiteMenuTemplate } from './view/menu.js';
import { createSiteMenuTemplate } from './view/menu.js';
import { createFilterMenuTemplate } from './view/filter.js';
import { createSiteSortTemplate } from './view/sort.js';
import { createTripEventsTemplate } from './view/event.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMenuElement = document.querySelector('.trip-controls__navigation');
render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');

const siteFiltersElement = document.querySelector('.trip-controls__filters');
render(siteFiltersElement, createFilterMenuTemplate(), 'beforeend');

const siteMainElement = document.querySelector('main').querySelector('.trip-events');
render(siteMainElement, createSiteSortTemplate(), 'beforeend');
render(siteMainElement, createTripEventsTemplate(), 'beforeend');
