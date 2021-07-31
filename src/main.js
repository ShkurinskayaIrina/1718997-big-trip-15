import { createMainTripTemplate } from './view/main-trip.js';
import { createSiteMenuTemplate } from './view/menu.js';
import { createFilterMenuTemplate } from './view/filter.js';
import { createSiteSortTemplate } from './view/sort.js';
import { createEditEventTemplate } from './view/event-list.js';
import { createEventHeader } from './view/event-header.js';
import { createEventSectionOffers } from './view/event-offers.js';
import { createEventSectionDestination } from './view/event-destination.js';
import { createTripEventsItemTemplate } from './view/event-item.js';
const TASK_COUNT = 3;
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteTripMainElement = document.querySelector('.trip-main');
render(siteTripMainElement, createMainTripTemplate(), 'afterbegin');

const siteMenuElement = document.querySelector('.trip-controls__navigation');
render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');

const siteFiltersElement = document.querySelector('.trip-controls__filters');
render(siteFiltersElement, createFilterMenuTemplate(), 'beforeend');

const siteMainElement = document.querySelector('main').querySelector('.trip-events');
render(siteMainElement,createSiteSortTemplate(), 'beforeend');

render(siteMainElement, createEditEventTemplate(), 'beforeend');

const siteEventEdit = document.querySelector('.event--edit');
render(siteEventEdit, createEventHeader(), 'afterbegin');

const siteEventDetailsElement = document.querySelector('main').querySelector('.event__details');
if (siteEventDetailsElement){
  //выводиться в будущем будет что-то одно: либо Offers, либо Destination
  render(siteEventDetailsElement, createEventSectionOffers(), 'beforeend');
  render(siteEventDetailsElement, createEventSectionDestination(), 'beforeend');
}

const siteTripEventsList = document.querySelector('.trip-events__list');
for (let i = 0; i < TASK_COUNT; i++) {
  render(siteTripEventsList, createTripEventsItemTemplate(), 'beforeend');
}
