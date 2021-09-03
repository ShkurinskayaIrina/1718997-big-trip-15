import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import { render, RenderPosition, replace,  remove } from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Event {
  constructor (eventListContainer, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleRollUpClick = this._handleRollUpClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripEvent) {
    this._tripEvent = tripEvent;
    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(tripEvent);
    this._eventEditComponent = new EventEditView(tripEvent);

    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setRollUpClickHandler(this._handleRollUpClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEditToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._eventEditComponent.reset(this._tripEvent);
      this._replaceEditToEvent();
    }
  }

  _handleEditClick() {
    this._replaceEventToEdit();
  }

  _handleRollUpClick() {
    this._eventEditComponent.reset(this._tripEvent);
    this._replaceEditToEvent();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._tripEvent,
        {
          isFavorite: !this._tripEvent.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit(tripEvent) {
    this._changeData(tripEvent);
    this._replaceEditToEvent();
  }

}

