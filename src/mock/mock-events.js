import { POINT_TYPES } from '../data.js';
import { DESCRIPTIONS } from './mock-data.js';
import { СITIES } from '../data.js';
import { getRandomArrayElement, getRandomInteger } from './mock-utils.js';
import { filterOffersByType } from '../utils/trip.js';

import dayjs from 'dayjs';
import minMax  from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

const getRandomDescriptions = () => {
  const countSentences = getRandomInteger (2,5);
  let description = '';
  for (let i = 0 ; i<countSentences ; i++){
    description = description + getRandomArrayElement(DESCRIPTIONS);
  }
  return description ;
};

const getRandomDate = () => {
  const maxDaysGap = 3000;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, 'minute');
};

const getRandonPhotos = () => {
  const arrayPhotos = new Array();
  const quantityPhotos = getRandomInteger(1,5);

  for (let i = 1 ; i <= quantityPhotos ; i++){
    const objPhotos = {};
    objPhotos.src = `http://picsum.photos/248/152?r=${getRandomInteger(0,20)}`;
    objPhotos.description = getRandomArrayElement(DESCRIPTIONS);
    arrayPhotos.push(objPhotos);
  }

  return arrayPhotos;
};

const getRandomOffers = (type) => {
  const availableOffers = filterOffersByType(type); //доступные предложения
  if (availableOffers[0].offers.length > 0) {
    return new Array(getRandomInteger(0, availableOffers[0].offers.length))
      .fill(null)
      .map(() => getRandomArrayElement(availableOffers[0].offers));
  }

  return [];
};

const generateMockDescriptionOfDestinations = () => {
  const destinations = new Array();
  СITIES.forEach((city) => {
    const isDate = Boolean(getRandomInteger(0, 1));
    const destination = new Object();
    destination.city = city;
    destination.description = isDate ? getRandomDescriptions() : '';
    destination.pictures = isDate ? getRandonPhotos() : '';
    destinations.push(destination);
  });
  return destinations;
};

let id = 1;
export const mockDescriptionOfDestinations = generateMockDescriptionOfDestinations();

const generateMockEvent = () => {
  const type = getRandomArrayElement(POINT_TYPES).toLowerCase();
  const date1 = getRandomDate();
  const date2 = getRandomDate();
  return {
    id : id++,
    basePrice : getRandomInteger(5,100),
    dateFrom : dayjs.min(date1, date2),
    dateTo : dayjs.max(date1, date2),
    destination : getRandomArrayElement(mockDescriptionOfDestinations),
    type,
    offers : Array.from(new Set(getRandomOffers(type))),
    isFavorite : Boolean(getRandomInteger(0, 1)),
  };
};


export const generateMockEvents = (quantityPoints) => new Array(quantityPoints).fill().map(() => generateMockEvent());

