///написать ф-цию подсчета времени в пути
import AbstractView from '../view/abstract.js';
import { formattingDateYMDHM, formattingDateYDM, formattingDateMD, formattingDateHM, formattingDateDiff } from '../utils/trip.js';

const creatEventOfferTemplate = (offers) =>
  offers.map(({title, price}) =>
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`).join('');

export const showEventTemplate = ({dateFrom, dateTo, destination, type, basePrice, isFavorite, offers}) =>{
  let classFavorite = '';
  if (isFavorite) {
    classFavorite='event__favorite-btn--active';
  }
  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${formattingDateYDM(dateFrom)}">${formattingDateMD(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${formattingDateYMDHM(dateFrom)}">${formattingDateHM(dateFrom)}</time>
                    &mdash;
          <time class="event__end-time" datetime="${formattingDateYMDHM(dateTo)}">${formattingDateHM(dateTo)}</time>
        </p>
        <p class="event__duration">${formattingDateDiff(dateFrom, dateTo)}</p>
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
export default class Event extends AbstractView {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent;
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return showEventTemplate(this._tripEvent);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }
}
