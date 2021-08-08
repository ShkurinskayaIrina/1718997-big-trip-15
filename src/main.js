import { createMainTripTemplate } from './view/main-trip.js';
import { createSiteMenuTemplate } from './view/menu.js';
import { createFilterMenuTemplate } from './view/filter.js';
import { createSiteSortTemplate } from './view/sort.js';
import { createEditEventTemplate } from './view/event-list.js';
import { createEventHeader } from './view/event-header.js';
import { createEventSectionOffers } from './view/event-offers.js';
import { createEventSectionDestination } from './view/event-destination.js';
import { createTripEventsItemTemplate } from './view/event-item.js';
import { generateTripEvent } from './view/util.js';
const TASK_COUNT = 15;


const tripEvents = new Array(TASK_COUNT).fill().map(()=>generateTripEvent());

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

let tripСities;
tripEvents.forEach((element) => {
  //выводим название городов в trip-main
  // добавить проверку на кол-во городов
  !tripСities ? tripСities=element.destination.title : tripСities=`${tripСities} — ${element.destination.title}`;
});

const tripEventsSort = tripEvents.slice().sort((prev, next) => prev.date_from - next.date_from);
// console.log(tripEventsSort);
//выводим даты путешествия (начатьная и конечная)
const tripDates=`${tripEventsSort[0].dateFrom.format('MMM D')} — ${tripEventsSort[tripEventsSort.length-1].dateTo.format('MMM D')}`;

const siteTripMainElement = document.querySelector('.trip-main');
render(siteTripMainElement, createMainTripTemplate(tripСities,tripDates), 'afterbegin');

const siteMenuElement = document.querySelector('.trip-controls__navigation');
render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');

const siteFiltersElement = document.querySelector('.trip-controls__filters');
render(siteFiltersElement, createFilterMenuTemplate(), 'beforeend');

const siteMainElement = document.querySelector('main').querySelector('.trip-events');
render(siteMainElement,createSiteSortTemplate(), 'beforeend');

render(siteMainElement, createEditEventTemplate(), 'beforeend');

const siteEventEdit = document.querySelector('.event--edit');
render(siteEventEdit, createEventHeader(tripEventsSort[0]), 'afterbegin');

const siteEventDetailsElement = document.querySelector('main').querySelector('.event__details');
if (siteEventDetailsElement){
  //выводиться в будущем будет что-то одно: либо Offers, либо Destination
  render(siteEventDetailsElement, createEventSectionOffers(tripEventsSort[0]), 'beforeend');
  render(siteEventDetailsElement, createEventSectionDestination(tripEventsSort[0].destination), 'beforeend');
}

const siteTripEventsList = document.querySelector('.trip-events__list');
for (let i = 1; i < TASK_COUNT; i++) {
  render(siteTripEventsList, createTripEventsItemTemplate(tripEventsSort[i]), 'beforeend');
}

