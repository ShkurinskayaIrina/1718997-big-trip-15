export const getRandomInteger = (count1, count2) => {
  const lower = Math.ceil(Math.min(count1, count2));
  const upper = Math.floor(Math.max(count1,count2));

  const result = Math.random() * (upper - lower+1) + lower;

  return Math.floor(result);
};

export const getRandomArrayElement = (elements) => elements [getRandomInteger (0, elements.length - 1)];

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
