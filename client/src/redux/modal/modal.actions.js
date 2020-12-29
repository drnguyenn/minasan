import ModalActionTypes from './modal.types';

export const toggleFindFriendsModalOpened = () => ({
  type: ModalActionTypes.TOGGLE_FIND_FRIENDS_MODAL_OPENED
});

export const toggleHobbiesModalOpened = () => ({
  type: ModalActionTypes.TOGGLE_HOBBIES_MODAL_OPENED
});

export const toggleTopicsModalOpened = () => ({
  type: ModalActionTypes.TOGGLE_TOPICS_MODAL_OPENED
});
