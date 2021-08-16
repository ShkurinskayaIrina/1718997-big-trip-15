import { POINT_TYPES } from '../data.js';
import { СITIES, DESCRIPTIONS , QUANTITY_POINTS } from './mock-data.js';
import { filterOffersByType } from '../utils/trip.js';

import dayjs from 'dayjs';
import minMax  from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

const getRandomInteger = (count1, count2) => {
  const lower = Math.ceil(Math.min(count1, count2));
  const upper = Math.floor(Math.max(count1,count2));

  const result = Math.random() * (upper - lower+1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements [getRandomInteger (0, elements.length - 1)];

const getRandomDescriptions = () => {
  const countSentences = getRandomInteger (1,5);
  let description ='';
  for (let i=0 ; i<countSentences ; i++){
    description = description + getRandomArrayElement(DESCRIPTIONS);
  }
  return description ;
};

const getRandomDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, 'day');
};

const getRandonArrayPhotos = () => {
  const arrayPhotos = new Array();

  const quantityPhotos = getRandomInteger(1,5);

  for (let i=1; i <= quantityPhotos ; i++){
    const objPhotos = {};
    objPhotos.src = `http://picsum.photos/248/152?r=${getRandomInteger(0,20)}`;
    objPhotos.description = getRandomArrayElement(DESCRIPTIONS);
    arrayPhotos.push(objPhotos);
  }

  return arrayPhotos;
};

const getRandomArrayOffers = (type) => {
  const availableOffers = filterOffersByType(type); //доступные предложения
  if (availableOffers[0].offers.length > 0) {
    return new Array(getRandomInteger(1, availableOffers[0].offers.length))
      .fill(null)
      .map(() => getRandomArrayElement(availableOffers[0].offers));
  }
  return [];
};

const generateMockPoint = () => {
  const type = getRandomArrayElement(POINT_TYPES).toLowerCase();
  const date1 = getRandomDate();
  const date2 = getRandomDate();

  return {
    basePrice : getRandomInteger(5,100),
    dateFrom : dayjs.min(date1, date2),
    dateTo : dayjs.max(date1, date2),
    destination :{
      city : getRandomArrayElement(СITIES),
      description : getRandomDescriptions(),
      photos : getRandonArrayPhotos(),
    },
    type,
    offers : getRandomArrayOffers(type),
    isFavorite : Boolean(getRandomInteger(0, 1)),
  };};

export const generateArrayMockPoints = () => new Array(QUANTITY_POINTS).fill().map(() => generateMockPoint());

