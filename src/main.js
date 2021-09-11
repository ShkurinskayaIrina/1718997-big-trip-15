import { generateMockEvents } from './mock/mock-events.js';
import { render, RenderPosition } from './utils/render.js';

import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
// import FiltersView from './view/filter.js';

import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';

import EventsModel from './model/events.js';
import FilterModel from './model/filter.js';

// import { FilterType } from './data.js';
// import { filter } from './utils/trip.js'; //проверка

const EVENTS_COUNT = 1;
const tripEvents = generateMockEvents(EVENTS_COUNT);

// console.log(tripEvents);

const eventsModel = new EventsModel();
eventsModel.setEvents(tripEvents);

const filterModel = new FilterModel();

if (tripEvents.length) {
  const mainElement = document.querySelector('.trip-main');
  render(mainElement, new TripInfoView(tripEvents), RenderPosition.AFTERBEGIN);
}

const siteMenuElement = document.querySelector('.trip-controls__navigation');
render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);

// render(filtersElement, new FiltersView(FilterType.EVERYTHING), 'beforeend');

const tripEventsElement = document.querySelector('main').querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel);

const filtersElement = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(filtersElement, filterModel, eventsModel);

filterPresenter.init();
tripPresenter.init();

const newEventButton = document.querySelector('.trip-main__event-add-btn');
newEventButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
  newEventButton.disabled = true;
});
