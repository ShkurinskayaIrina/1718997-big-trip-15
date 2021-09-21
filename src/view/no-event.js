import AbstractView from '../view/abstract.js';
import { FilterType } from '../const.js';

export const NoEventsTextType = {
  [FilterType.EVERYTHING] : 'Click New Event to create your first point',
  [FilterType.FUTURE] : 'There are no future events now',
  [FilterType.PAST] : 'There are no past events now',
};

const showNoEventTemplate = (filterType) => {
  const NoEventTextType = NoEventsTextType[filterType];

  return (
    `<p class="trip-events__msg">${NoEventTextType}</p>`);
};

export default class NoEvent extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return showNoEventTemplate(this._data);
  }
}
