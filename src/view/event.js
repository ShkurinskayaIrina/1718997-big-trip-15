///написать ф-цию подсчета времени в пути
import { createElement } from '../utils/render.js';
import dayjs from 'dayjs';

const creatEventOfferTemplate = (offers) =>
  offers.map(({title, price}) =>
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`).join('');

export const showEventTemplate = ({dateFrom, dateTo, destination,type, basePrice, isFavorite, offers}) =>{
  let classFavorite = '';
  if (isFavorite){
    classFavorite='event__favorite-btn--active';
  }
  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('MMM D')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateFrom).format('HH:mm')}</time>
                    &mdash;
          <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateTo).format('HH:mm')}</time>
        </p>
        <p class="event__duration">${dayjs(dateTo).diff(dateFrom,'day')}D</p>
      </div>
      <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${creatEventOfferTemplate(offers)}
      </ul>
      <button class="event__favorite-btn ${classFavorite}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `;
};


export default class Event {
  constructor(tripEvent) {
    this._tripEvent = tripEvent;
    this._element = null;
  }

  getTemplate() {
    return showEventTemplate(this._tripEvent);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}