import ChatActionTypes from './chat.types';

export const fetchChatContentStart = chatId => ({
  type: ChatActionTypes.FETCH_CHAT_CONTENT_START,
  payload: chatId
});

export const fetchChatContentSuccess = chat => ({
  type: ChatActionTypes.FETCH_CHAT_CONTENT_SUCCESS,
  payload: chat
});

export const fetchChatContentFailure = error => ({
  type: ChatActionTypes.FETCH_CHAT_CONTENT_FAILURE,
  payload: error
});

export const fetchConversationsStart = chatId => ({
  type: ChatActionTypes.FETCH_CONVERSATIONS_START,
  payload: chatId
});

export const fetchConversationsSuccess = chat => ({
  type: ChatActionTypes.FETCH_CONVERSATIONS_SUCCESS,
  payload: chat
});

export const fetchConversationsFailure = error => ({
  type: ChatActionTypes.FETCH_CONVERSATIONS_FAILURE,
  payload: error
});
