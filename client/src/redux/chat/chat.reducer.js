import ChatActionTypes from './chat.types';

const INITIAL_STATE = {
  chatHistory: [],
  suggestedUser: [],
  currentChat: { title: '', messages: [] },
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

    case ChatActionTypes.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case ChatActionTypes.FETCH_CONVERSATIONS_START:
      return {
        ...state,
        isLoading: true
      };

    case ChatActionTypes.FETCH_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        chatHistory: action.payload,
        isLoading: false,
        error: null
      };

    case ChatActionTypes.FETCH_SUGGESTED_START:
      return {
        ...state,
        isLoading: true,
      }

    case ChatActionTypes.FETCH_SUGGESTED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        suggestedUser: action.payload
      }

    case ChatActionTypes.CREATE_CONVERSATION_START:
      return {
        ...state,
        isLoading: true,
      }

    case ChatActionTypes.CREATE_CONVERSATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state;
  }
};

export default chatReducer;
