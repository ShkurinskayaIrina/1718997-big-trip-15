import AbstractView from '../view/abstract.js';
import { filterOffersByType } from '../utils/trip.js';
import { POINT_TYPES } from '../data.js';
import { СITIES } from '../mock/mock-data.js';
//форматировать дату

const isChecked = (findOffer, arrayOffers) => {
  if (arrayOffers.find((offer) => offer.title===findOffer.title)) {
    return 'checked';
  }
};

const showEventTypeItemTemplate = (typeItem) => POINT_TYPES.map((type) =>
  `<div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${typeItem === type.toLowerCase() ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`,
).join('');

const showDestinationListTemplate = () => СITIES.map((city) =>
  `<option value="${city}"></option>`,
).join('');

const findLastWord = ({title}) => {
  //беру последнее слово в наименовании оффера и записываю его в id
  const arrayTitle = title.split(' ');
  return arrayTitle[arrayTitle.length-1];
};

const showEventOfferSelectorTemplate = (availableOffers, checkedOffers) =>
  availableOffers.map((availableOffer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${findLastWord(availableOffer)}-1" type="checkbox" name="event-offer-${findLastWord(availableOffer)}" ${isChecked(availableOffer,checkedOffers)}>
      <label class="event__offer-label" for="event-offer-${findLastWord(availableOffer)}-1">
        <span class="event__offer-title">${availableOffer.title}</span>
             &plus;&euro;&nbsp;
        <span class="event__offer-price">${availableOffer.price}</span>
      </label>
    </div>`).join('');

const showEventOffersTemplate = (type, offers) => {
  const availableOffersByType = filterOffersByType(type);
  const availableOffers = availableOffersByType[0].offers;

  if  (availableOffers.length > 0) {
    return `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${showEventOfferSelectorTemplate(availableOffers, offers)}
        </div>
      </section>`;
  }
  return '';
};

const createEventPhotosTape = (photos) =>
  photos.map(({src}) =>`<img class="event__photo" src="${src}" alt="Event photo">`).join('');

const showEventSectionDestinationTemplate = (description, photos) =>
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${createEventPhotosTape(photos)}
      </div>
    </div>
  </section>`;

const showEventEditTemplate = ({type, dateFrom, dateTo, destination, basePrice, offers}) =>
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${showEventTypeItemTemplate(type)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
             ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${showDestinationListTemplate()}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
            &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
              &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${showEventOffersTemplate(type, offers)}
        ${showEventSectionDestinationTemplate(destination.description, destination.photos)}
      </section>
    </form>
  </li>`;

//при отсутствии данных выводить пустые поля
export default class EventEdit extends AbstractView {
  constructor (tripEvent) {
    super();
    this._tripEvent = tripEvent;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._ClickHandler = this._ClickHandler.bind(this);
  }

  getTemplate() {
    return showEventEditTemplate(this._tripEvent);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  _ClickHandler(evt) {
    evt.preventDefault();
    this._callback.Click();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setClickHandler(callback) {
    this._callback.Click = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._ClickHandler);
  }
}
