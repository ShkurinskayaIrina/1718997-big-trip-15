import { generateArrayMockPoints } from './mock/mock-utils.js';
import { render, RenderPosition } from './utils/render.js';
import { generateTripInfoMain, sortTripEvents } from './utils/trip.js';

import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import FiltersView from './view/filter.js';
import NoEventView from './view/no-event.js';
import SortView from './view/sort.js';
import EventsListView from './view/events-list';
import EventView from './view/event.js';
import EventEditView from './view/event-edit.js';

const tripEvents = generateArrayMockPoints();
const tripEventsSortByDate = tripEvents.slice().sort(sortTripEvents);

// console.log(tripEventsSortByDate);

if (tripEventsSortByDate.length > 0) {
  const infoMain = generateTripInfoMain(tripEventsSortByDate);
  const mainElement = document.querySelector('.trip-main');
  render(mainElement, new TripInfoView(infoMain).getElement(), RenderPosition.AFTERBEGIN);
}

const siteMenuElement = document.querySelector('.trip-controls__navigation');
render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);


const filtersElement = document.querySelector('.trip-controls__filters');
render(filtersElement, new FiltersView().getElement(), 'beforeend');

const tripEventsElement = document.querySelector('main').querySelector('.trip-events');

const renderEvent = (eventListElement, tripEvent) => {
  const eventComponent = new EventView(tripEvent);
  const eventEditComponent = new EventEditView(tripEvent);

  const replaceEditToEvent = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const replaceEventToEdit = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEditToEvent();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

if (tripEventsSortByDate.length > 0) {
  render(tripEventsElement, new SortView().getElement(), 'beforeend');

  const eventListComponent = new EventsListView();
  render(tripEventsElement, eventListComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < tripEventsSortByDate.length; i++) {
    renderEvent(eventListComponent.getElement(), tripEventsSortByDate[i]);
  }
} else {
  render(tripEventsElement, new NoEventView().getElement(), 'beforeend');
}
