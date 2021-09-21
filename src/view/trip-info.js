import AbstractView from '../view/abstract.js';

const generateTripInfoMain = (tripEvents) => {
  //некорректно работает
  const cityFirst = tripEvents[0].destination.name;
  let cityFinal = '';

  const dateFirst = tripEvents[0].dateFrom;
  let dateFinal = '';

  let separator = '';

  if (tripEvents.length > 1 ){
    separator = '— ... —';
    cityFinal = tripEvents[tripEvents.length-1].destination.name;
    dateFinal = tripEvents[tripEvents.length-1].dateTo;
    if ( tripEvents.length === 2 ) {
      separator = '—';
    }
  }
  const tripInfoTitle = `${cityFirst} ${separator} ${cityFinal}`;
  //отформатировать дату
  // const tripInfoDates = String(dateFirst)+' '+separator+' '+String(dateFinal);

  const tripInfoDates = `${dateFirst} ${separator} ${dateFinal}`;

  // к цене еще добавить цену офферов
  const tripInfoCost = tripEvents.reduce((cost, event) => cost = cost + event.basePrice, 0);
  return {tripInfoTitle, tripInfoDates, tripInfoCost};

};

export const showTripInfoTemplate = (tripEvents) => {
  const {tripInfoTitle, tripInfoDates, tripInfoCost} = generateTripInfoMain(tripEvents);
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfoTitle}</h1>
      <p class="trip-info__dates">${tripInfoDates}</p>
    </div>
    <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripInfoCost}</span>
  </section>`;
};

export default class TripInfo extends AbstractView {
  constructor (tripEvents) {
    super();
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return showTripInfoTemplate(this._tripEvents);
  }

}
