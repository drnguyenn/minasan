import ChatActionTypes from './chat.types';

const INITIAL_STATE = {
  chatHistory: [],
<<<<<<< HEAD
  currentChat: null,
  random_chatter: [],
=======
  currentChat: { title: '', messages: [] },
>>>>>>> 9c1ddaf57362285299c3405c9e9a7cdd8639355a
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

    case ChatActionTypes.FETCH_CONVERSATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case ChatActionTypes.FETCH_RANDOM_START:
      return {
        ...state,
        isLoading: true,
      }

    case ChatActionTypes.FETCH_RANDOM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        random_chatter: action.payload
      }
      
    case ChatActionTypes.FETCH_RANDOM_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case ChatActionTypes.CREATE_CONVERSASION_START:
      return {
        ...state,
        isLoading: true,
      }

    case ChatActionTypes.CREATE_CONVERSASION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }

    case ChatActionTypes.CREATE_CONVERSASION_FAILURE:
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
