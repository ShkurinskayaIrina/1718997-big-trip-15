import AbstractObserver from './abstract-observer.js';
import { FilterType, MenuItem} from '../const.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
    this._menuItem = MenuItem.TABLE;
  }

  setFilter(updateType, filter, menuItem) {
    this._activeFilter = filter;
    this._menuItem = menuItem;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }

  getMenuItem() {
    return this._menuItem;
  }
}
