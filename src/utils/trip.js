import { OFFERS } from '../data.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

// import relativeTime from 'dayjs/plugin/relativeTime';
// dayjs.extend(relativeTime);

export const filterOffersByType = (type) => OFFERS.filter((offer) => offer.type === type);

export const sortDateDown = (prev, next) => next.dateFrom - prev.dateFrom;
export const sortDateUp = (prev, next) => prev.dateFrom - next.dateFrom;
export const sortPrice = (prev, next) => next.basePrice - prev.basePrice;
export const sortTime = (prev, next) => dayjs(next.dateTo).diff(next.dateFrom,'day') - dayjs(prev.dateTo).diff(prev.dateFrom,'day');

export const formattingDateDMYHM = (dateTime) => dayjs(dateTime).format('DD/MM/YY HH:mm');
export const formattingDateYMDHM = (dateTime) => dayjs(dateTime).format('YY-MM-DDTHH:mm');
export const formattingDateMD = (dateTime) => dayjs(dateTime).format('MMM DD').toUpperCase();
export const formattingDateYDM = (dateTime) => dayjs(dateTime).format('YYYY-DD-MM');
export const formattingDateHM = (dateTime) => dayjs(dateTime).format('HH:mm');
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
