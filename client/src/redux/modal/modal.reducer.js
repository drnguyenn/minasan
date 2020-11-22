import ModalActionTypes from './modal.types';

const INITIAL_STATE = {
  isFindFriendsModalOpened: false
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ModalActionTypes.TOGGLE_FIND_FRIENDS_MODAL_OPENED:
      return {
        ...state,
        isFindFriendsModalOpened: !state.isFindFriendsModalOpened
      };

    default:
      return state;
  }
};

export default modalReducer;
