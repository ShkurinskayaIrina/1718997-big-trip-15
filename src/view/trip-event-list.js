import { showEventHeaderTemplate } from './event-header.js';
import { showEventSectionOffersTemplate } from './event-offers.js';
import { showEventSectionDestinationTemplate } from './event-destination.js';

export const showTripEventsListTemplate = (tripEvent) =>
  `<ul class="trip-events__list">
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        ${showEventHeaderTemplate(tripEvent)}
        <section class="event__details">
          ${showEventSectionOffersTemplate(tripEvent)}
          ${showEventSectionDestinationTemplate(tripEvent.destination)}
        </section>
     </form>
    </li>
  </ul> `;

