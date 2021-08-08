const createEventPhotosTape = function (photos) {
  let eventPhotosTape = '';
  photos.forEach((element) => {
    const {picture, description} = element;
    eventPhotosTape = `${eventPhotosTape}<img class="event__photo" src="${picture}" alt="${description}">`;
  });
  return eventPhotosTape;
};

const createEventSectionDestination = function(destination){
  const {description, photo} = destination;

  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${createEventPhotosTape(photo)}
      </div>
    </div>
  </section>`;
};

export {createEventSectionDestination};
