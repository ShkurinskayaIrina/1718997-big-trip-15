import AbstractView from '../view/abstract.js';
import { filterOffersByType } from '../utils.js/trip.js';
import { POINT_TYPES } from '../data.js';
import { СITIES } from '../data.js';
//форматировать дату
// const date = dueDate !== null
// ? dayjs(dueDate).format('D MMMM')
// : '';

const isChecked = (findOffer, arrayOffers) => arrayOffers.some((offer) => offer.title===findOffer.title);

const getUniqueID = ({title}) => title.replace(/\s/g, '-').toLowerCase();

const showEventTypeItemTemplate = (index, typeItem) => POINT_TYPES.map((type) =>
  `<div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${typeItem === type.toLowerCase() ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${index}">${type}</label>
  </div>`,
).join('');

const showDestinationListTemplate = () => СITIES.map((city) =>
  `<option value="${city}"></option>`,
).join('');

const showEventOfferSelectorTemplate = (index, availableOffers, checkedOffers) =>
  availableOffers.map((availableOffer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getUniqueID(availableOffer)}-${index}" type="checkbox" name="event-offer-${getUniqueID(availableOffer)}" ${isChecked(availableOffer,checkedOffers) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${getUniqueID(availableOffer)}-${index}">
        <span class="event__offer-title">${availableOffer.title}</span>
             &plus;&euro;&nbsp;
        <span class="event__offer-price">${availableOffer.price}</span>
      </label>
    </div>`).join('');

const showEventOffersTemplate = (index, type, offers) => {
  const availableOffersByType = filterOffersByType(type);
  const availableOffers = availableOffersByType[0].offers;

  if  (availableOffers.length > 0) {
    return `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${showEventOfferSelectorTemplate(index, availableOffers, offers)}
        </div>
      </section>`;
  }
  return '';
};

const showEventPhotosTape = (photos) =>
  photos.map(({src}) =>`<img class="event__photo" src="${src}" alt="Event photo">`).join('');

const showEventSectionDestinationTemplate = (description, photos) =>
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${showEventPhotosTape(photos)}
      </div>
    </div>
  </section>`;

const showEventEditTemplate = (index, {type, dateFrom, dateTo, destination, basePrice, offers}) =>
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${index}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${index}" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${showEventTypeItemTemplate(index, type)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${index}">
             ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${index}" type="text" name="event-destination" value="${destination.city}" list="destination-list-${index}">
          <datalist id="destination-list-${index}">
            ${showDestinationListTemplate()}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${index}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${index}" type="text" name="event-start-time" value="${dateFrom}">
            &mdash;
          <label class="visually-hidden" for="event-end-time-${index}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${index}" type="text" name="event-end-time" value="${dateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${index}">
            <span class="visually-hidden">Price</span>
              &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${index}" type="text" name="event-price" value="${basePrice}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${showEventOffersTemplate(index, type, offers)}
        ${showEventSectionDestinationTemplate(destination.description, destination.photos)}
      </section>
    </form>
  </li>`;

//при отсутствии данных выводить пустые поля
export default class EventEdit extends AbstractView {
  constructor (index, tripEvent) {
    super();
    this._index = index;
    this._tripEvent = tripEvent;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._btnClickHandler = this._btnClickHandler.bind(this);
  }

  getTemplate() {
    return showEventEditTemplate(this._index, this._tripEvent);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  _btnClickHandler(evt) {
    evt.preventDefault();
    this._callback.btnClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setBtnClickHandler(callback) {
    this._callback.btnClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._btnClickHandler);
  }
}
