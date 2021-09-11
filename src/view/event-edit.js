import SmartView from '../view/smart.js';

import { filterOffersByType } from '../utils/trip.js';
import { EVENT_TYPES } from '../data.js';
import { СITIES } from '../data.js';
import { mockDescriptionOfDestinations } from '../mock/mock-events.js';
import { formattingDateDMYHM, isInvalidDatePeriod } from '../utils/trip.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {
  basePrice : '',
  destination : {
    city: '',
    description: null,
    pictures: null,
  },
  type: EVENT_TYPES[0].toLowerCase(),
  offers : [],
  isFavorite : false,
  isNew : true,
};

const isChecked = (findOffer, arrayOffers) => arrayOffers.some((offer) => offer.title===findOffer.title);

const getUniqueID = ({title}) => title.replace(/\s/g, '-').toLowerCase();

const showEventTypeItemTemplate = (typeItem) => EVENT_TYPES.map((type) =>
  `<div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${typeItem === type.toLowerCase() ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`,
).join('');

const showDestinationListTemplate = () => СITIES.map((city) =>
  `<option value="${city}"></option>`,
).join('');

const showEventOfferSelectorTemplate = (availableOffers, checkedOffers) =>
  availableOffers.map((availableOffer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getUniqueID(availableOffer)}-1" type="checkbox" name="event-offer-${getUniqueID(availableOffer)}" ${isChecked(availableOffer,checkedOffers) ? 'checked=' : ''}>
      <label class="event__offer-label" for="event-offer-${getUniqueID(availableOffer)}-1">
        <span class="event__offer-title">${availableOffer.title}</span>
             &plus;&euro;&nbsp;
        <span class="event__offer-price">${availableOffer.price}</span>
      </label>
    </div>`).join('');

const showEventOffersTemplate = (type, offers) => {
  const availableOffersByType = filterOffersByType(type)[0].offers;
  return `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${showEventOfferSelectorTemplate(availableOffersByType, offers)}
        </div>
      </section>`;
};

const showEventPhotosTape = (photos) => photos.map(({src, description}) =>`<img class="event__photo" src="${src}" alt="${description}">`).join('');

const showEventSectionDestinationTemplate = ({description, pictures}) =>
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
     <p class="event__destination-description">${description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${showEventPhotosTape(pictures)}
      </div>
    </div>
  </section>`;

const showRollupBtn = () =>
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;

const showEventEditTemplate = ({type, dateFrom, dateTo, destination, basePrice, offers, isOffers, isDestination, isNew}) =>
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
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattingDateDMYHM(dateFrom)}">
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
        <button class="event__save-btn  btn  btn--blue" type="submit" ${isInvalidDatePeriod(dateTo, dateFrom) ? 'disabled' : ''}>Save</button>
        <button class="event__reset-btn" type="reset">${isNew ? 'Cancel' : 'Delete'}</button>
        ${isNew ? '' :showRollupBtn()}
      </header>
      <section class="event__details">
        ${isOffers ? showEventOffersTemplate(type, offers) : ''}
        ${isDestination ? showEventSectionDestinationTemplate(destination) : ''}
      </section>
    </form>
  </li>`;

export default class EventEdit extends SmartView {
  constructor (tripEvent = BLANK_EVENT) {
    super();
    this._data  = EventEdit.parseEventToData(tripEvent);
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

  reset(tripEvent) {
    this.updateData(
      EventEdit.parseEventToData(tripEvent),
    );
  }

  getTemplate() {
    return showEventEditTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickerStart();
    this._setDatepickerEnd();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setRollUpClickHandler(this._callback.btnClick);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseDataToEvent(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  removeElement() {
    super.removeElement();
    this._resetDatepicker();
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
        // mode: 'range',
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: formattingDateDMYHM(this._data.dateFrom),
        // defaultDate: [formattingDateDMYHM(this._data.dateFrom), formattingDateDMYHM(this._data.dataTo)],
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
        // mode: 'range',
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: formattingDateDMYHM(this._data.dateTo),
        // defaultDate: [formattingDateDMYHM(this._data.dateFrom), formattingDateDMYHM(this._data.dataTo)],
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
      this.getElement().querySelector('.event__available-offers')
        .addEventListener('click', this._offersToggleHandler);
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
      isOffers: !!filterOffersByType(evt.target.innerHTML.toLowerCase())[0].offers.length,
    });
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();
    if (!evt.target.value) {
      return;
    }
    if (СITIES.includes(evt.target.value)) {
      evt.target.setCustomValidity('');
    } else {
      evt.target.setCustomValidity('Выберите город из списка!');
      return;
    }
    evt.target.reportValidity();

    const descriptionOfDestinations = mockDescriptionOfDestinations.find((destination) => destination.city === evt.target.value);
    this.updateData({
      destination: descriptionOfDestinations,
      isDestination : !!descriptionOfDestinations.description,
    });
  }

  _offersToggleHandler(evt) {
    evt.preventDefault();
    const selectedOffer = new Object();
    if (evt.target.tagName === 'SPAN') {
      if (evt.target.className === 'event__offer-title') {
        selectedOffer.title = evt.target.textContent;
        selectedOffer.price = Number(evt.target.parentNode.lastElementChild.textContent);
        // selectedOffer.checked = !evt.target.parentNode.previousElementSibling.checked;

      } else if ( evt.target.className === 'event__offer-price') {
        selectedOffer.title = evt.target.parentNode.firstElementChild.textContent;
        selectedOffer.price = Number(evt.target.textContent);
        // selectedOffer.checked = !evt.target.parentNode.previousElementSibling.checked;
      }

    } else if (evt.target.tagName === 'LABEL') {
      selectedOffer.title = evt.target.childNodes[1].textContent;
      selectedOffer.price = Number(evt.target.lastElementChild.textContent);
      // selectedOffer.checked = !evt.target.previousElementSibling.checked;
    } else {
      return;
    }
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
    if (Number.isInteger(price) && price>0) {
      evt.target.setCustomValidity('');
    } else {
      evt.target.setCustomValidity('Введите целое положительное число!');
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

  // static setFormCloseHandler() {
  //   const newEventButton = document.querySelector('.trip-main__event-add-btn');
  //   newEventButton.disabled = false;
  // }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setRollUpClickHandler(callback) {
    this._callback.btnClick = callback;
    if (!this._data.isNew) {
      this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollUpClickHandler);
    }
  }

  static parseEventToData(event) {
    let allOffersByType;
    if (event.type) {
      allOffersByType = filterOffersByType(event.type)[0].offers[0];
    }

    return Object.assign(
      {},
      event,
      {
        isOffers: !!allOffersByType,
        isDestination: !!event.destination.description,
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);
    delete data.isOffers;
    delete data.isDestination;
    // EventEdit.setFormCloseHandler();
    return data;
  }
}

