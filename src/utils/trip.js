import { FilterType } from '../const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const sortDateDown = (prev, next) => next.dateFrom - prev.dateFrom;
export const sortPrice = (prev, next) => next.basePrice - prev.basePrice;
export const sortTime = (prev, next) => dayjs(next.dateTo).diff(next.dateFrom,'minutes') - dayjs(prev.dateTo).diff(prev.dateFrom,'minutes');

export const sort = {
  money: (prev, next) => next.money - prev.money,
  typeCount:(prev, next) => next.count - prev.count,
  time: (prev, next) => next.time - prev.time,
};

export const countDurationEvent = (dateStart, dateEnd) => dayjs.duration(dayjs(dateEnd).diff(dayjs(dateStart))).$ms;

export const formattingDateDMYHM = (dateTime) => dayjs(dateTime).format('DD/MM/YY HH:mm');
export const formattingDateYMDHM = (dateTime) => dayjs(dateTime).format('YY-MM-DDTHH:mm');
export const formattingDateMD = (dateTime) => dayjs(dateTime).format('MMM DD').toUpperCase();
export const formattingDateYDM = (dateTime) => dayjs(dateTime).format('YYYY-DD-MM');
export const formattingDateHM = (dateTime) => dayjs(dateTime).format('HH:mm');

export const isInvalidDatePeriod = (dateTo, dateFrom) => dayjs(dateFrom).isAfter(dayjs(dateTo), 'minute');

const formatDigitToNumber = (digit) => (`00${digit}`).slice(-2);

const formatDurationEvent = (durationEvent) => {
  let days = '';
  let hours = '';
  let minutes = '';

  if (durationEvent.days > 0) {
    days = `${formatDigitToNumber(durationEvent.days)}D`;
    hours = '00H';
  }

  if (durationEvent.hours > 0) {
    hours = `${formatDigitToNumber(durationEvent.hours)}H`;
  }

  minutes = `${formatDigitToNumber(durationEvent.minutes)}M`;
  return `${days} ${hours} ${minutes}`;
};

export const separationDurationEvent = (durationEvent) => {
  const msInSecond = 1000;
  const msInMinute = msInSecond * 60;
  const msInHour = msInMinute * 60;
  const msInDays = msInHour * 24;

  const days = parseInt(durationEvent / msInDays, 10);
  const hours = parseInt((durationEvent - days * msInDays) / msInHour, 10);
  const minutes = parseInt((durationEvent- days * msInDays - hours * msInHour) / msInMinute, 10);

  const separateDurationEvent = {
    days: days,
    hours: hours,
    minutes: minutes,
  };
  return formatDurationEvent (separateDurationEvent);
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

