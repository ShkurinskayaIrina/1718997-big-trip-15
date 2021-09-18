import AbstractView from '../view/abstract.js';
// import { MenuItem } from '../data.js';

const showSiteMenuTemplate = () => (
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>
  </div>`);

export default class SiteMenu extends AbstractView {
  constructor(currentMenuItem) {
    super();
    this._currentMenuItem = currentMenuItem;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return showSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.textContent);

  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const items = this.getElement().querySelectorAll('nav a');
    items.forEach((item) => {
      if (item !== null && item.textContent === menuItem) {
        item.classList.add('trip-tabs__btn--active');
      } else {
        item.classList.remove('trip-tabs__btn--active');
      }
    });
  }
}
