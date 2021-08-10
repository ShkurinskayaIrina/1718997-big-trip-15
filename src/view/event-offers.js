import { filterOffersByType } from '../utils.js';

const isChecked = (findOffer, arrayOffers) => {
  if (arrayOffers.find((offer) => offer.title===findOffer.title)) {
    return 'checked';
  }
};

const findLastWord = ({title}) => {
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


export const showEventSectionOffersTemplate = ({type, offers}) => {
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

