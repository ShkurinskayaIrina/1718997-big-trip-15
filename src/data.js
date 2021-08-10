// Everthing – 'Click New Event to create your first point' - В случае отсутствия точек маршрута вместо списка отображается
// * Past — 'There are no past events now';
// * Future — 'There are no future events now'.

const POINT_TYPES= [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];
const INFO_MAIN_NULL = {
  tripInfoTitle :'',
  tripInfoDates :'',
  tripInfoCost :'',
};

const FILTERS =[
  'everything',
  'future',
  'past',
];

const TYPES_SORT = [
  'Day',
  'Event',
  'Time',
  'Price',
  'Offers',
];
export {POINT_TYPES, INFO_MAIN_NULL, FILTERS, TYPES_SORT};
