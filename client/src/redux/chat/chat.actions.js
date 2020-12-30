import ChatActionTypes from './chat.types';

export const fetchChatContentStart = (receiverId, roomId) => ({
  type: ChatActionTypes.FETCH_CHAT_CONTENT_START,
  payload: { receiverId, roomId }
});

export const fetchChatContentSuccess = chat => ({
  type: ChatActionTypes.FETCH_CHAT_CONTENT_SUCCESS,
  payload: chat
});

export const fetchChatContentFailure = error => ({
  type: ChatActionTypes.FETCH_CHAT_CONTENT_FAILURE,
  payload: error
});

export const fetchConversationsStart = currentUserId => ({
  type: ChatActionTypes.FETCH_CONVERSATIONS_START,
  payload: { currentUserId }
});

export const fetchConversationsSuccess = (chatList, currentPartner) => ({
  type: ChatActionTypes.FETCH_CONVERSATIONS_SUCCESS,
  payload: { chatList, currentPartner }
});

export const fetchConversationsFailure = error => ({
  type: ChatActionTypes.FETCH_CONVERSATIONS_FAILURE,
  payload: error
});

export const fetchSuggestedUsersStart = () => ({
  type: ChatActionTypes.FETCH_SUGGESTED_USERS_START
});

export const fetchSuggestedUsersSuccess = suggesstedList => ({
  type: ChatActionTypes.FETCH_SUGGESTED_USERS_SUCCESS,
  payload: suggesstedList
});

export const fetchSuggestedUsersFailure = error => ({
  type: ChatActionTypes.FETCH_SUGGESTED_USERS_FAILURE,
  payload: error
});

export const createConversationStart = partnerId => ({
  type: ChatActionTypes.CREATE_CONVERSATION_START,
  payload: partnerId
});

export const createConversationSuccess = userList => ({
  type: ChatActionTypes.CREATE_CONVERSATION_SUCCESS,
  payload: userList
});

export const createConversationFailure = error => ({
  type: ChatActionTypes.CREATE_CONVERSATION_FAILURE,
  payload: error
});

export const sendMessageStart = (senderId, message) => ({
  type: ChatActionTypes.SEND_MESSAGE_START,
  payload: { message, senderId }
});

export const sendMessageSuccess = (message, senderId) => ({
  type: ChatActionTypes.SEND_MESSAGE_SUCCESS,
  payload: { message, senderId }
});

export const sendMessageFailure = error => ({
  type: ChatActionTypes.SEND_MESSAGE_FAILURE,
  payload: error
});
