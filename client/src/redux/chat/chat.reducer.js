import ChatActionTypes from './chat.types';

const INITIAL_STATE = {
  chatHistory: [],
  currentChat: null,
  isLoading: false,
  error: null
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatActionTypes.FETCH_CHAT_CONTENT_START:
      return {
        ...state,
        isLoading: true
      };

    case ChatActionTypes.FETCH_CHAT_CONTENT_SUCCESS:
      return {
        ...state,
        currentChat: action.payload,
        isLoading: false,
        error: null
      };

    case ChatActionTypes.FETCH_CHAT_CONTENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default chatReducer;
