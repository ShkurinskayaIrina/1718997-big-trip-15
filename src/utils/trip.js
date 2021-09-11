import { OFFERS, FilterType } from '../data.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

// import relativeTime from 'dayjs/plugin/relativeTime';
// dayjs.extend(relativeTime);

export const filterOffersByType = (type) => OFFERS.filter((offer) => offer.type === type);
export const sortDateDown = (prev, next) => next.dateFrom - prev.dateFrom;
export const sortPrice = (prev, next) => next.basePrice - prev.basePrice;
export const sortTime = (prev, next) => dayjs(next.dateTo).diff(next.dateFrom,'minutes') - dayjs(prev.dateTo).diff(prev.dateFrom,'minutes');

export const formattingDateDMYHM = (dateTime) => dayjs(dateTime).format('DD/MM/YY HH:mm');
export const formattingDateYMDHM = (dateTime) => dayjs(dateTime).format('YY-MM-DDTHH:mm');
export const formattingDateMD = (dateTime) => dayjs(dateTime).format('MMM DD').toUpperCase();
export const formattingDateYDM = (dateTime) => dayjs(dateTime).format('YYYY-DD-MM');
export const formattingDateHM = (dateTime) => dayjs(dateTime).format('HH:mm');

export const isInvalidDatePeriod = (dateTo, dateFrom) => dayjs(dateFrom).isAfter(dayjs(dateTo), 'minute');

const formattingDigitToNumber = (digit) => (`00${digit}`).slice(-2);
export const formattingDateDiff = (dateStart, dateEnd) => {
  const durationEvent = dayjs.duration(dayjs(dateEnd).diff(dayjs(dateStart)));

  const durationDays = formattingDigitToNumber(durationEvent.days());
  const durationHours = formattingDigitToNumber(durationEvent.hours());
  const durationMinutes = formattingDigitToNumber(durationEvent.minutes());

  let formattingDurationEvent = '';
  if (durationDays > 0) {
    formattingDurationEvent = `${durationDays}D ${durationHours}H ${durationMinutes}M`;
  } else if (durationHours > 0) {
    formattingDurationEvent = `${durationHours}H ${durationMinutes}M`;
  } else {
    formattingDurationEvent = `${durationMinutes}M`;
  }
  return formattingDurationEvent;
};

export const isDatesEqual = (dateA, dateB) =>
  (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB);


export const filter = {
  [FilterType.EVERYTHING]: (tripEvents) => tripEvents,
  [FilterType.FUTURE]: (tripEvents) => tripEvents.filter((tripEvent) => dayjs().isBefore(dayjs(tripEvent.dateFrom)) ||
  (dayjs(tripEvent.dateFrom).isBefore(dayjs()) && dayjs(tripEvent.dateTo).isAfter(dayjs()))),
  [FilterType.PAST]: (tripEvents) => tripEvents.filter((tripEvent) => dayjs(tripEvent.dateTo).isBefore(dayjs()) ||
  (dayjs(tripEvent.dateFrom).isBefore(dayjs()) && dayjs(tripEvent.dateTo).isAfter(dayjs()))),
};

//   [FilterType.FUTURE]: (tripEvents) => tripEvents.filter((tripEvent) => dayjs().isBefore(dayjs(tripEvent.dateFrom), 'minute') ||
//    (dayjs().isAfter(dayjs(tripEvent.dateFrom), 'minute') && dayjs().isBefore(dayjs(tripEvent.dateTo), 'minute'))),


//   [FilterType.PAST]: (tripEvents) => tripEvents.filter((tripEvent) => dayjs().isAfter(dayjs(tripEvent.dateTo), 'minute') ||
//   (dayjs().isAfter(dayjs(tripEvent.dateFrom), 'minute') && dayjs().isBefore(dayjs(tripEvent.dateTo), 'minute'))),
// };
