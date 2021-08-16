import AbstractView from '../view/abstract.js';

const showNoEventTemplate = () => (
  //привязать фразу к типу фильтра
  //что-то с классом, фразу скрывает
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoEvent extends AbstractView {
  getTemplate() {
    return showNoEventTemplate();
  }
}
