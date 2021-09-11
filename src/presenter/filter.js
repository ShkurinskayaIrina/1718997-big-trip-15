import FilterView from '../view/filter.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
// import {filter} from '../utils/trip.js';
import {UpdateType} from '../data.js'; //FilterType


export default class Filter {
  constructor(filterContainer, filterModel, eventsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    // const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;
    // this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent = new FilterView(this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    // if (this._filterModel.getFilter() === filterType) {
    //   return;
    // }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  // _getFilters() {
  //   // const events = this._eventsModel.getEvents();

  //   return [
  //     {
  //       type: FilterType.EVERYTHING,
  //       // name: 'All',
  //       // count: filter[FilterType.ALL](tasks).length,
  //     },
  //     {
  //       type: FilterType.FUTURE,
  //       // name: 'Overdue',
  //       // count: filter[FilterType.OVERDUE](tasks).length,
  //     },
  //     {
  //       type: FilterType.PAST,
  //       // name: 'Today',
  //       // count: filter[FilterType.TODAY](tasks).length,
  //     },
  //   ];
  // }
}