import { generateMockPoints } from './mock/mock-points.js';
import { render, RenderPosition, replace  } from './utils.js/render.js';
import { sortTripEvents } from './utils.js/trip.js';

import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import FiltersView from './view/filter.js';
import NoEventView from './view/no-event.js';
import SortView from './view/sort.js';
import EventsListView from './view/events-list';
import EventView from './view/event.js';
import EventEditView from './view/event-edit.js';

const POINTS_COUNT = 15;
const tripEvents = generateMockPoints(POINTS_COUNT);
const tripEventsSortByDate = tripEvents.slice().sort(sortTripEvents);

// console.log(tripEventsSortByDate);

if (tripEventsSortByDate.length > 0) {
  const mainElement = document.querySelector('.trip-main');
  render(mainElement, new TripInfoView(tripEventsSortByDate), RenderPosition.AFTERBEGIN);
}

const siteMenuElement = document.querySelector('.trip-controls__navigation');
render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);


const filtersElement = document.querySelector('.trip-controls__filters');
render(filtersElement, new FiltersView(), 'beforeend');

const tripEventsElement = document.querySelector('main').querySelector('.trip-events');

const renderEvent = (eventListElement, index, tripEvent) => {
  const eventComponent = new EventView(tripEvent);
  const eventEditComponent = new EventEditView(index, tripEvent);

  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.setBtnEditClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setBtnClickHandler(() => {
    replaceEditToEvent();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceEditToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};

if (tripEventsSortByDate.length > 0) {
  render(tripEventsElement, new SortView(), 'beforeend');

  const eventListComponent = new EventsListView();
  render(tripEventsElement, eventListComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < tripEventsSortByDate.length; i++) {
    renderEvent(eventListComponent, i+1, tripEventsSortByDate[i]);
  }
} else {
  render(tripEventsElement, new NoEventView(), 'beforeend');
}
