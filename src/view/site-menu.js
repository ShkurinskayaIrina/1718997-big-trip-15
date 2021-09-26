import AbstractView from '../view/abstract.js';
import { MenuItem } from '../const.js';

const createSiteMenuTemplate = () => (
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" data-menu_item=${MenuItem.TABLE} href="#">Table</a>
      <a class="trip-tabs__btn" data-menu_item=${MenuItem.STATS} href="#">Stats</a>
    </nav>
  </div>`);

export default class SiteMenu extends AbstractView {
  constructor(currentMenuItem) {
    super();
    this._currentMenuItem = currentMenuItem;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const itemActiveElement = this.getElement().querySelector('.trip-tabs__btn--active');
    itemActiveElement.classList.remove('trip-tabs__btn--active');
    const itemElement = this.getElement().querySelector(`nav a[data-menu_item = ${menuItem}]`);
    itemElement.classList.add('trip-tabs__btn--active');
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.textContent);
  }
}
