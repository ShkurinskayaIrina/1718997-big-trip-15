import { generateMockEvents } from './mock/mock-events.js';
import { render, remove, RenderPosition } from './utils/render.js';
import { MenuItem } from './const.js';

import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import StatisticsView from './view/statistics.js';

import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';

import EventsModel from './model/events.js';
import FilterModel from './model/filter.js';

import { UpdateType, FilterType } from './const.js';

const EVENTS_COUNT = 1;
const tripEvents = generateMockEvents(EVENTS_COUNT);

const eventsModel = new EventsModel();
eventsModel.setEvents(tripEvents);

const filterModel = new FilterModel();

const mainElement = document.querySelector('.trip-main');
if (tripEvents.length) {
  render(mainElement, new TripInfoView(tripEvents), RenderPosition.AFTERBEGIN);
}

const siteMenuElement = mainElement.querySelector('.trip-main__trip-controls');
const siteMenuComponent = new SiteMenuView();

render(siteMenuElement, siteMenuComponent, RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(siteMenuElement, filterModel, eventsModel);
const tripEventsElement = document.querySelector('main').querySelector('.trip-events');
const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel);
let menuItemActive = MenuItem.TABLE;
let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  if (menuItemActive === menuItem) {
    return;
  }
  switch (menuItem) {
    case MenuItem.TABLE:
      // Скрыть статистику
      remove(statisticsComponent);
      // Показать изменения в меню
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
      menuItemActive = MenuItem.TABLE;
      // Показать события
      tripPresenter.init();
      break;
    case MenuItem.STATS:
      // Скрыть события
      tripPresenter.destroy();
      // Показать изменения в меню
      siteMenuComponent.setMenuItem(MenuItem.STATS);
      siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
      menuItemActive = MenuItem.STATS;
      // Показать статистику
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(tripEventsElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

const newEventButton = document.querySelector('.trip-main__event-add-btn');

const handleNewEventFormClose = () => {
  newEventButton.disabled = false;
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

newEventButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  // Скрыть статистику
  remove(statisticsComponent);
  // Показать изменения в меню
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  menuItemActive = MenuItem.TABLE;

  // Показать события
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();
  // Показать форму добавления новой задачи
  tripPresenter.createEvent(handleNewEventFormClose);
  // Убрать выделение с New event после сохранения
  newEventButton.disabled = true;
});


