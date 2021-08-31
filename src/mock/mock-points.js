import { POINT_TYPES } from '../data.js';
import { DESCRIPTIONS } from './mock-data.js';
import { СITIES } from '../data.js';
import { getRandomArrayElement, getRandomInteger } from './mock-utils.js';
import { filterOffersByType } from '../utils/trip.js';

import dayjs from 'dayjs';
import minMax  from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

const getRandomDescriptions = () => {
  const countSentences = getRandomInteger (1,5);
  let description = '';
  for (let i = 0 ; i<countSentences ; i++){
    description = description + getRandomArrayElement(DESCRIPTIONS);
  }
  return description ;
};

const getRandomDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, 'day');
};

const getRandonPhotos = () => {
  const arrayPhotos = new Array();

  const quantityPhotos = getRandomInteger(1,5);

  for (let i = 1; i <= quantityPhotos ; i++){
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
    return new Array(getRandomInteger(1, availableOffers[0].offers.length))
      .fill(null)
      .map(() => getRandomArrayElement(availableOffers[0].offers));
  }
  return [];
};

let id = 1;

const generateMockPoint = () => {
  const type = getRandomArrayElement(POINT_TYPES).toLowerCase();
  const date1 = getRandomDate();
  const date2 = getRandomDate();

  return {
    id : id++,
    basePrice : getRandomInteger(5,100),
    dateFrom : dayjs.min(date1, date2),
    dateTo : dayjs.max(date1, date2),
    destination :{
      city : getRandomArrayElement(СITIES),
      description : getRandomDescriptions(),
      photos : getRandonPhotos(),
    },
    type,
    offers : Array.from(new Set(getRandomOffers(type))),
    isFavorite : Boolean(getRandomInteger(0, 1)),
  };};

export const generateMockPoints = (quantityPoints) => new Array(quantityPoints).fill().map(() => generateMockPoint());

