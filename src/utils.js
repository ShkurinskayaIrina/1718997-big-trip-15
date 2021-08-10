import { OFFERS } from './mock/mock-data.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const generateTripInfoMain = (tripEventsArray) => {
  const cityFirst = tripEventsArray[0].destination.city;
  let cityFinal = '';

  const dateFirst = tripEventsArray[0].dateFrom;
  let dateFinal = '';

  let separator = '';

  if (tripEventsArray.length > 1 ){
    separator = '— ... —';
    cityFinal = tripEventsArray[tripEventsArray.length-1].destination.city;
    dateFinal = tripEventsArray[tripEventsArray.length-1].dateTo;
    if ( tripEventsArray.length === 2 ) {
      separator = '—';
    }
  }
  const tripInfoTitle = `${cityFirst} ${separator} ${cityFinal}`;
  //отформатировать дату
  const tripInfoDates = `${dateFirst} ${separator} ${dateFinal}`;
  // к цене еще добавить цену офферов
  const tripInfoCost = tripEventsArray.reduce((cost, event) => cost = cost + event.basePrice, 0);
  return {tripInfoTitle, tripInfoDates, tripInfoCost};

};

const sortTripEvents = (prev, next) => prev.dateFrom - next.dateFrom;
const filterOffersByType = (type) => OFFERS.filter((offer) => offer.type === type);


export {render, generateTripInfoMain, sortTripEvents, filterOffersByType};
