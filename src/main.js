import { render, remove, RenderPosition } from './utils/render.js';
import { MenuItem } from './const.js';

import SiteMenuView from './view/site-menu.js';
import StatisticsView from './view/statistics.js';

import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';

import EventsModel from './model/events.js';
import FilterModel from './model/filter.js';

import { UpdateType, FilterType } from './const.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic lt72Wq1kOmR9p7asXZ';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';


const newEventButtonElement = document.querySelector('.trip-main__event-add-btn');
newEventButtonElement.disabled = true;

const api = new Api(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const mainElement = document.querySelector('.trip-main');

const siteMenuElement = mainElement.querySelector('.trip-main__trip-controls');
const siteMenuComponent = new SiteMenuView();

render(siteMenuElement, siteMenuComponent, RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(siteMenuElement, filterModel, eventsModel);
const tripEventsElement = document.querySelector('main').querySelector('.trip-events');
const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel, api);
let menuItemActive = MenuItem.TABLE;
let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  if (menuItemActive === menuItem) {
    return;
  }
  switch (menuItem) {
    case MenuItem.TABLE:
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING, MenuItem.TABLE);

      remove(statisticsComponent);

      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
      menuItemActive = MenuItem.TABLE;

      tripPresenter.init();
      break;
    case MenuItem.STATS:

      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING, MenuItem.STATS);

      siteMenuComponent.setMenuItem(MenuItem.STATS);
      siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
      menuItemActive = MenuItem.STATS;

      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(tripEventsElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

const handleNewEventFormClose = () => {
  newEventButtonElement.disabled = false;
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
filterPresenter.init();
tripPresenter.init();

newEventButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  remove(statisticsComponent);

  siteMenuComponent.setMenuItem(MenuItem.TABLE);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  menuItemActive = MenuItem.TABLE;

  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING, MenuItem.TABLE);
  tripPresenter.init();

  tripPresenter.createEvent(handleNewEventFormClose);

  newEventButtonElement.disabled = true;
});

const selectionCitiesFromDestination = (destinations) => {
  const cities = new Array;
  destinations.forEach( (destination) => {
    cities.push(destination.name);
  });
  return cities;
};

const TravelData = {
  events: [],
  cities: [],
  offers: [],
  destinations: [],
};


Promise.all([
  api.getEvents(),
  api.getDestinations(),
  api.getOffers()]).
  then(([events, destinations, offers]) => {
    TravelData.events = events;
    TravelData.cities = selectionCitiesFromDestination(destinations);
    TravelData.offers = offers;
    TravelData.destinations = destinations;
    eventsModel.setEvents(UpdateType.INIT, TravelData);
    newEventButtonElement.disabled = false;
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, TravelData);
    newEventButtonElement.disabled = false;
  });

