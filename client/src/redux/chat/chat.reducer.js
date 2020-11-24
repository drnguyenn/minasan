import ChatActionTypes from './chat.types';

const INITIAL_STATE = {
  chatHistory: [],
  suggestedUser: [],
  // currentChat: { title: '', roomId: -1, messages: [] },
  currentPartner: null,
  currentChat: { conversationId: '', title: '', roomId: -1, messages: [] },
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
        currentChat: action.payload,
        isLoading: false,
        error: null
      };

    case ChatActionTypes.FETCH_CONVERSATIONS_START:
      return {
        ...state,
        isLoading: true
      };

    case ChatActionTypes.FETCH_CONVERSATIONS_SUCCESS:
      // const currPartner =
      //   action.payload.length > 0 ? action.payload[0].user2 : null;
      const { chat_list, user } = action.payload;
      var currPartner;
      if (chat_list > 0) {
        currPartner =
          chat_list.user2.id === user.id ? chat_list.user1 : chat_list.user2;
      }
      console.log(chat_list);
      console.log(user);
      return {
        ...state,
        chatHistory: chat_list,
        currentPartner: null,
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
      return {
        ...state,
        isSending: true
      };

    case ChatActionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          messages: [...state.currentChat.messages, action.payload.message]
        },
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
