import AbstractView from './abstract.js';

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateData() {

  }

  updateElement() {

  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }
}
