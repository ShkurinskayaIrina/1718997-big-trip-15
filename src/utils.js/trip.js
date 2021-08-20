import { OFFERS } from '../data.js';
// может перенести во вью
// что-то сделать с моками, чтобы не было зависимости от них
export const generateTripInfoMain = (tripEventsArray) => {
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

export const sortTripEvents = (prev, next) => prev.dateFrom - next.dateFrom;

export const filterOffersByType = (type) => OFFERS.filter((offer) => offer.type === type);

// export const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('D MMMM');

// ${humanizeTaskDueDate(dueDate)
