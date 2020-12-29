import ChatActionTypes from './chat.types';

const INITIAL_STATE = {
  connectedUser: [],
  suggestedUser: [],
  currentPartner: {},
  currentChat: {
    receiverId: '',
    roomId: -1,
    messages: []
  },
  isLoading: false,
  isSending: false,
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
        currentChat: action.payload.chat,
        currentPartner: action.payload.currentPartner,
        isLoading: false,
        error: null
      };

    case ChatActionTypes.FETCH_CONVERSATIONS_START:
      return {
        ...state,
        isLoading: true
      };

    case ChatActionTypes.FETCH_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        connectedUser: action.payload.chat_list,
        currentPartner: action.payload.currentPartner || state.currentPartner,
        isLoading: false,
        error: null
      };

    case ChatActionTypes.FETCH_SUGGESTED_USERS_START:
      return {
        ...state,
        isLoading: true
      };

    case ChatActionTypes.FETCH_SUGGESTED_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        suggestedUser: action.payload
      };

    case ChatActionTypes.CREATE_CONVERSATION_START:
      return {
        ...state,
        isLoading: true
      };

    case ChatActionTypes.CREATE_CONVERSATION_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case ChatActionTypes.SEND_MESSAGE_START:
      const { senderId, message } = action.payload;

      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          messages: [
            ...state.currentChat.messages,
            {
              id: state.currentChat.messages.length + 1,
              senderId,
              message
            }
          ]
        },
        isSending: true
      };

    case ChatActionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        isSending: false
      };

    case ChatActionTypes.FETCH_CHAT_CONTENT_FAILURE:
    case ChatActionTypes.FETCH_CONVERSATIONS_FAILURE:
    case ChatActionTypes.FETCH_SUGGESTED_USERS_FAILURE:
    case ChatActionTypes.CREATE_CONVERSATION_FAILURE:
    case ChatActionTypes.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSending: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default chatReducer;
