export const EVENT_TYPES = [
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

export const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PAST: 'Past',
};


export const SortTypes = {
  DAY : 'day',
  EVENT : 'event',
  TIME : 'time',
  PRICE : 'price',
  OFFERS : 'offers',
};

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH', //обновить часть списка (например, когда поменялось описание)
  MINOR: 'MINOR', //обновить список (например, когда изменились данные, касающиеся тек фильтрации)
  MAJOR: 'MAJOR', //обновить весь список (например, при переключении фильтра)
  INIT: 'INIT', //обновить список при инициализации приложения
};

export const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export const ChartTitle = {
  MONEY: 'MONEY',
  TYPE: 'TYPE',
  TIME_SPAND: 'TIME-SPAND',
};
