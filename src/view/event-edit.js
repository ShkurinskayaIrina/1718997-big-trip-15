import SmartView from '../view/smart.js';

import { EVENT_TYPES, ErrorMessages } from '../const.js';

import { formattingDateDMYHM, formattingDefaultDate } from '../utils/trip.js';

import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

import dayjs from 'dayjs';

const BLANK_EVENT = {
  basePrice : '',
  dateFrom: new Date(),
  dateTo: new Date(),
  destination : {
    name: '',
    description: null,
    pictures: null,
  },
  type: EVENT_TYPES[0].toLowerCase(),
  offers: [],
  isFavorite: false,
  isBlank: true,
};

const getOffersFilterByType = (type, offers) => offers.filter((offer) => offer.type === type);

const getCheckedOffer = (findOffer, offers) => offers.some((offer) => offer.title === findOffer.title);

const getUniqueID = ({title}) => title.replace(/\s/g, '-').toLowerCase();

const setTextContentResetBtn = (isBlank, isDeleting) => {
  if (isDeleting) {
    return 'Deleting...';
  }
  if (isBlank) {
    return 'Cancel';
  } else {
    return 'Delete';
  }
};

const createEventTypeItemTemplate = (typeItem) => EVENT_TYPES.map((type) =>
  `<div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${typeItem === type.toLowerCase() ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`,
).join('');

const createDestinationListTemplate = (cities) => cities.map((city) =>
  `<option value="${city}"></option>`,
).join('');

const createEventOfferSelectorTemplate = (availableOffers, checkedOffers, isDisabled) =>
  availableOffers.map((availableOffer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
      id="event-offer-${getUniqueID(availableOffer)}-1"
      type="checkbox" name="event-offer-${getUniqueID(availableOffer)}"
      ${isDisabled ? 'disabled' : ''}
      ${getCheckedOffer(availableOffer,checkedOffers) ? 'checked' : ''}>

      <label class="event__offer-label" for="event-offer-${getUniqueID(availableOffer)}-1">
        <span class="event__offer-title">${availableOffer.title}</span>
             &plus;&euro;&nbsp;
        <span class="event__offer-price">${availableOffer.price}</span>
      </label>
    </div>`).join('');

const createEventOffersTemplate = (type, offers, isDisabled, offersAll) => {
  const availableOffersByType = (offersAll.length > 0 ? getOffersFilterByType(type, offersAll)[0].offers : []);
  return `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createEventOfferSelectorTemplate(availableOffersByType, offers, isDisabled)}
        </div>
      </section>`;
};

const createEventPhotosTape = (photos) => photos.map(({src, description}) =>`<img class="event__photo" src="${src}" alt="${description}">`).join('');

const createEventSectionDestinationTemplate = ({description, pictures}) =>
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
     <p class="event__destination-description">${description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${createEventPhotosTape(pictures)}
      </div>
    </div>
  </section>`;

const createRollupBtn = () =>
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;

const createEventEditTemplate = (
  {type,
    dateFrom,
    dateTo,
    destination,
    basePrice,
    offers,
    isOffers,
    isDestination,
    isBlank,
    isDisabled,
    isSaving,
    isDeleting,
  }, additionalData) =>
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
              ${isDisabled ? '' : createEventTypeItemTemplate(type)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
             ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
            ${isDisabled ? 'disabled' : createDestinationListTemplate(additionalData.cities)}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? formattingDateDMYHM(dateFrom) : ''}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? formattingDateDMYHM(dateTo) : ''}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
              &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit"
        ${isDisabled ? 'disabled' : ''}>
          ${isSaving ? 'Saving...' : 'Save'}
        </button>
        <button class="event__reset-btn" type="reset">${setTextContentResetBtn(isBlank, isDeleting)}

        </button>
        ${isBlank ? '' : createRollupBtn()}
      </header>
      <section class="event__details">
        ${isOffers ? createEventOffersTemplate(type, offers, isDisabled, additionalData.offers) : ''}
        ${isDestination ? createEventSectionDestinationTemplate(destination) : ''}
      </section>
    </form>
  </li>`;

export default class EventEdit extends SmartView {
  constructor (tripEvent, additionalData) {
    super();
    if (tripEvent === null) {
      tripEvent = BLANK_EVENT;
    }
    this._additionalData = additionalData;
    this._data  = EventEdit.parseEventToData(tripEvent, this._additionalData.offers);

    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._rollUpClickHandler = this._rollUpClickHandler.bind(this);

    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._offersToggleHandler = this._offersToggleHandler.bind(this);
    this._priceToggleHandler = this._priceToggleHandler.bind(this);
    this._setInnerHandlers();

    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);

    this._setDatepickerStart();
    this._setDatepickerEnd();
  }

  getTemplate() {
    return createEventEditTemplate(this._data, this._additionalData);
  }

  removeElement() {
    super.removeElement();
    this._resetDatepicker();
    this.removeHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickerStart();
    this._setDatepickerEnd();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setRollUpClickHandler(this._callback.btnClick);
  }

  removeHandlers() {
    const eventEditTemplate = this.getElement();
    eventEditTemplate.querySelector('.event__type-list').
      removeEventListener('click', this._eventTypeToggleHandler);
    eventEditTemplate.querySelector('.event__field-group--destination').
      removeEventListener('change', this._destinationToggleHandler);
    eventEditTemplate.querySelector('.event__field-group--price')
      .removeEventListener('change', this._priceToggleHandler);
    eventEditTemplate.querySelector('form').
      removeEventListener('submit', this._formSubmitHandler);
    eventEditTemplate.querySelector('.event__reset-btn').
      removeEventListener('click', this._formDeleteClickHandler);
    if (!this._data.isBlank) {
      eventEditTemplate.querySelector('.event__rollup-btn').
        removeEventListener('click', this._rollUpClickHandler);
    }
    if (this._data.isOffers) {
      const offers = eventEditTemplate.querySelectorAll('.event__offer-checkbox');
      offers.forEach((offer) => {offer.removeEventListener('change', this._offersToggleHandler);});
    }
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setRollUpClickHandler(callback) {
    this._callback.btnClick = callback;
    if (!this._data.isBlank) {
      this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollUpClickHandler);
    }
  }

  reset(tripEvent) {
    this.updateData(
      EventEdit.parseEventToData(tripEvent, this._additionalData.offers),
    );
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseDataToEvent(this._data));
  }

  _resetDatepicker() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  _setDatepickerStart() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    this._datepickerStart = flatpickr(
      this.getElement().querySelector('[name = "event-start-time"]'),
      {
        enableTime: true,
        maxDate: this._data.dateTo,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateFrom,
        onChange: this._startTimeChangeHandler,
      },
    );
  }

  _setDatepickerEnd() {
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerEnd = flatpickr(
      this.getElement().querySelector('[name = "event-end-time"]'),
      {
        enableTime: true,
        minDate: this._data.dateFrom-1,
        dateFormat: 'd/m/y H:i',
        defaultDate: formattingDefaultDate(dayjs(new Date())),
        onChange: this._endTimeChangeHandler,
      },
    );
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-list')
      .addEventListener('click', this._eventTypeToggleHandler);

    this.getElement().querySelector('.event__field-group--destination')
      .addEventListener('change', this._destinationToggleHandler);

    if (this._data.isOffers) {
      const offers = this.getElement().querySelectorAll('.event__offer-checkbox');
      offers.forEach((offer) => {offer.addEventListener('change', this._offersToggleHandler);});
    }
    this.getElement().querySelector('.event__field-group--price')
      .addEventListener('change', this._priceToggleHandler);
  }

  _startTimeChangeHandler([userDate]) {
    this.updateData({
      dateFrom: userDate,
    });
  }

  _endTimeChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate,
    });
  }

  _eventTypeToggleHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    this.updateData({
      type: evt.target.innerText.toLowerCase(),
      offers: [],
      isOffers: !!getOffersFilterByType(evt.target.innerHTML.toLowerCase(), this._additionalData.offers)[0].offers.length,
    });
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();

    if (!evt.target.value) {
      return;
    }

    if (this._additionalData.cities.includes(evt.target.value)) {
      evt.target.setCustomValidity('');
    } else {
      evt.target.setCustomValidity(ErrorMessages.DESTINATION);
      return;
    }
    evt.target.reportValidity();

    const descriptionOfDestinations = this._additionalData.destinations.find((destination) => destination.name === evt.target.value);

    this.updateData({
      destination: descriptionOfDestinations,
      isDestination : !!descriptionOfDestinations.description,
    });
  }

  _offersToggleHandler(evt) {
    evt.preventDefault();
    const selectedOffer = new Object();
    const labelOfferElementChecked = this.getElement().querySelector(`label[for="${evt.target.id}"]`);
    selectedOffer.title = labelOfferElementChecked.querySelector('.event__offer-title').textContent;
    selectedOffer.price = Number(labelOfferElementChecked.querySelector('.event__offer-price').textContent);

    const selectedOffers = this._data.offers.slice(0);

    const isCheckedOffer = this._data.offers.length ? this._data.offers.findIndex((offer) => (offer.title) === selectedOffer.title) : -1;

    if (isCheckedOffer < 0) {
      selectedOffers.push(selectedOffer);
    } else {
      selectedOffers.splice(isCheckedOffer, 1);
    }
    this.updateData({
      offers: selectedOffers,
    });
  }

  _priceToggleHandler(evt) {
    evt.preventDefault();
    if (!evt.target.value) {
      return;
    }
    const price = Number(evt.target.value);

    if (Number.isInteger(price) && price > 0) {
      evt.target.setCustomValidity('');
    } else {
      evt.target.setCustomValidity(ErrorMessages.PRICE);
      return;
    }
    evt.target.reportValidity();

    this.updateData({
      basePrice: evt.target.value,
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  _rollUpClickHandler(evt) {
    evt.preventDefault();
    this._callback.btnClick();
  }

  static parseEventToData(event, offers) {
    let allOffersByType;
    if (event.type) {
      allOffersByType = (offers.length > 0 ? getOffersFilterByType(event.type, offers)[0].offers[0] : []);
    }
    return Object.assign(
      {},
      event,
      {
        isOffers: !!allOffersByType,
        isDestination: !!event.destination.description,
        isBlank: event.isBlank ? event.isBlank : false,
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);
    delete data.isOffers;
    delete data.isDestination;
    delete data.isBlank;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;
    return data;
  }
}

