import ChatActionTypes from './chat.types';

const INITIAL_STATE = {
  chatHistory: [],
  suggestedUser: [],
  currentChat: { title: '', roomId: -1, messages: [] },
  currentPartner: null,
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
      const currPartner = action.payload.length>0?action.payload[0].user2:null
      return {
        ...state,
        chatHistory: action.payload,
        currentPartner: currPartner,
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


    default:
      return state;
  }
};

export default chatReducer;
