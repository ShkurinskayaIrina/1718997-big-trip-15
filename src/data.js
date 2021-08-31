export const POINT_TYPES = [
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

export const TextDependFilter = {
  EVERYTHING : 'Click New Event to create your first point',
  FUTURE : 'There are no future events now',
  PAST : 'There are no past events now',
};

export const SortTypes = {
  DAY : 'Day',
  EVENT : 'Event',
  TIME : 'Time',
  PRICE : 'Price',
  OFFERS : 'Offers',
};

export const СITIES = [
  'Amsterdam',
  'Antalya',
  'Bangkok',
  'Chamonix',
  'Dubai',
  'Geneva',
  'Hong Kong',
  'Istanbul',
  'Kuala Lumpur',
  'Kuala',
  'London',
  'Macau',
  'Moscow',
  'Paris',
  'Rio de Janeiro',
  'Rostov-on-Don',
  'Saint-Petersburg',
  'Singapore',
  'Tokyo',
  'Vyshny Volochek',
];

export const OFFERS = [
  {'type': 'taxi',
    'offers': [
      {
        'title' : 'Upgrade to a business class',
        'price' : 120,
      }, {
        'title' : 'Choose the radio station',
        'price' : 60,
      },
    ],
  },
  {
    'type': 'bus',
    'offers': [
      {
        'title' : 'Infotainment system',
        'price' : 50,
      }, {
        'title' : 'Order meal',
        'price' : 100,
      }, {
        'title' : 'Choose seats',
        'price' : 190,
      },
    ],
  },
  {
    'type' : 'train',
    'offers': [
      {
        'title' :'Book a taxi at the arrival point',
        'price' : 110,
      }, {
        'title' : 'Order a breakfast',
        'price' : 80,
      }, {
        'title' : 'Wake up at a certain time',
        'price' : 140,
      }, {
        'title' : 'Switch to comfort class',
        'price' : 100,
      },
    ],
  },
  {
    'type' : 'ship',
    'offers' : [
      {
        'title' : 'Choose meal',
        'price' : 130,
      }, {
        'title' : 'Upgrade to comfort class',
        'price' : 170,
      }, {
        'title' : 'Upgrade to business class',
        'price' : 150,
      }, {
        'title' : 'Add luggage',
        'price' : 100,
      }, {
        'title' : 'Business lounge',
        'price' : 40,
      },
    ],
  },
  {
    'type': 'drive',
    'offers' : [
      {
        'title' : 'Choose comfort class',
        'price' : 110,
      }, {
        'title' : 'Choose business class',
        'price' : 180,
      },
    ],
  },
  {
    'type': 'flight',
    'offers': [
      {
        'title' : 'Choose meal',
        'price': 120,
      }, {
        'title' :'Choose seats',
        'price': 90,
      }, {
        'title' :'Upgrade to comfort class',
        'price': 120,
      }, {
        'title' :'Upgrade to business class',
        'price': 120,
      }, {
        'title' :'Business lounge',
        'price' : 160,
      },
    ],
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'title' :'Choose live music',
        'price' : 150,
      }, {
        'title' :'Choose VIP area',
        'price' : 70,
      },
    ],
  },
  {
    'type': 'check-in',
    'offers': [],
  },
  {
    'type': 'sightseeing',
    'offers': [],
  },
];
