import { OFFERS } from '../data.js';
import dayjs from 'dayjs';

export const filterOffersByType = (type) => OFFERS.filter((offer) => offer.type === type);

export const sortDateDown = (prev, next) => next.dateFrom - prev.dateFrom;
export const sortDateUp = (prev, next) => prev.dateFrom - next.dateFrom;
export const sortPrice = (prev, next) => next.basePrice - prev.basePrice;
// export const sortOffers = (prev, next) => next.offers.length - prev.offers.length;
export const sortTime = (prev, next) => dayjs(next.dateTo).diff(next.dateFrom,'day') - dayjs(prev.dateTo).diff(prev.dateFrom,'day');

// export const sortEvent = (prev, next) => {
//   const eventA = `${prev.type} ${prev.destination.city}`;
//   const eventB = `${next.type} ${next.destination.city}`;
//   if (eventA > eventB) {
//     return 1;
//   }
//   if (eventA < eventB) {
//     return -1;
//   }

//   return 0;
// };


// export const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('D MMMM');

// ${humanizeTaskDueDate(dueDate)

// export const sortEvent = (eventA, eventB) => {
//   if (eventA.destination.city > eventB.destination.city) {
//     return 1;
//   }
//   if (eventA.destination.city < eventB.destination.city) {
//     return -1;
//   }

//   return 0;
// };

// const getWeightForNullDate = (dateA, dateB) => {
//   if (dateA === null && dateB === null) {
//     return 0;
//   }

//   if (dateA === null) {
//     return 1;
//   }

//   if (dateB === null) {
//     return -1;
//   }

//   return null;
// };


// export const sortTaskDown = (taskA, taskB) => {
//   const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

//   if (weight !== null) {
//     return weight;
//   }

//   return dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
// };
