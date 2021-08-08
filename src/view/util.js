import { destinationDescriptions, additionalOptions, eventTypes, destinationСities } from './data';
import dayjs from 'dayjs';

const getRandomInteger = function(count1,count2){
  const lower = Math.ceil(Math.min(count1, count2));
  const upper = Math.floor(Math.max(count1,count2));

  const result = Math.random() * (upper - lower+1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getRandomDestinationDescription = function () {
  const countSentences = getRandomInteger(1,5);
  let description ='';
  for (let i=0 ; i<countSentences ; i++){
    description = description + destinationDescriptions[i];
  }
  return description ;
};

const generateDate = function () {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, 'day');
};

const filterOffersByType = function (query) {
  const allOffersByType = new Array;
  additionalOptions.filter((element)=> {
    if (element.type ===query){
      if (element.offers.length>0) {
        element.offers.forEach((el) => {
          allOffersByType.push(el);
        });
      }
    }
  });
  return allOffersByType;
};

const getRandonArrayPhotos = function () {
  const arrayPhotos = new Array();

  const quantityPhotos = getRandomInteger(1,5);
  for (let i=1; i <= quantityPhotos ; i++){
    const objPhotos = {};
    objPhotos.picture = `http://picsum.photos/248/152?r=${getRandomInteger(0,20)}`;
    objPhotos.description = getRandomArrayElement(destinationDescriptions);
    arrayPhotos.push(objPhotos);
  }
  return arrayPhotos;
};

const getRandomArrayOffers = function (type) {
  const arrayOffers = filterOffersByType(type);
  if (arrayOffers.length>0) {
    return new Array(getRandomInteger(1,arrayOffers.length)).fill(null).map(()=>getRandomArrayElement(arrayOffers));
  }
  return [];
};

const generateTripEvent = function () {
  // создание точки маршрута
  let date1 = generateDate();
  let date2 = generateDate();
  if (date1.isAfter(date2)) {
    const buff = date1;
    date1 = date2;
    date2 = buff;
  }
  const type = getRandomArrayElement(eventTypes);
  return {
    basePrice : `${getRandomInteger(10,100000)} €`,
    dateFrom : date1,
    dateTo : date2,
    destination :{ //вынести отдельно
      title : getRandomArrayElement(destinationСities),
      description : getRandomDestinationDescription(destinationDescriptions),
      photo : getRandonArrayPhotos(),
    },
    type,
    offers : getRandomArrayOffers(type),
    isFavorite : Boolean(getRandomInteger(0, 1)),
  };
};

export {generateTripEvent, filterOffersByType};
