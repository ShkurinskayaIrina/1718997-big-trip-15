import AbstractView from '../view/abstract.js';

export const showTripInfoTemplate = ({tripInfoTitle, tripInfoDates, tripInfoCost}) =>
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfoTitle}</h1>
      <p class="trip-info__dates">${tripInfoDates}</p>
    </div>
    <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripInfoCost}</span>
  </section>`;
export default class TripInfo extends AbstractView {
  constructor (info) {
    super();
    this._info = info;
    // this._element = null;
  }

  getTemplate() {
    return showTripInfoTemplate(this._info);
  }

}
