import ModalActionTypes from './modal.types';

const INITIAL_STATE = {
  isFindFriendsModalOpened: false,
  isHobbiesModalOpened: false
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ModalActionTypes.TOGGLE_FIND_FRIENDS_MODAL_OPENED:
      return {
        ...state,
        isFindFriendsModalOpened: !state.isFindFriendsModalOpened
      };

    case ModalActionTypes.TOGGLE_HOBBIES_MODAL_OPENED:
      return {
        ...state,
        isHobbiesModalOpened: !state.isHobbiesModalOpened
      };

    default:
      return state;
  }
};

export default modalReducer;
