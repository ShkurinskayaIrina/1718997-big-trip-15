const editEventTemplate =
`<ul class="trip-events__list">
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <section class="event__details">
      </section>
    </form>
  </li>`;

const createEditEventTemplate = function () {
  return editEventTemplate;
};

export {createEditEventTemplate};
