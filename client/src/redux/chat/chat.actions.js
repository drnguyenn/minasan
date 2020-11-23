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

export const fetchConversationsStart = () => ({
  type: ChatActionTypes.FETCH_CONVERSATIONS_START,
});

export const fetchConversationsSuccess = chat_list => ({
  type: ChatActionTypes.FETCH_CONVERSATIONS_SUCCESS,
  payload: chat_list
});

export const fetchConversationsFailure = error => ({
  type: ChatActionTypes.FETCH_CONVERSATIONS_FAILURE,
  payload: error
});

export const fetchRandom = () => ({
  type: ChatActionTypes.FETCH_RANDOM_START,
});

export const fetchRandomSuccess = user_list => ({
  type: ChatActionTypes.FETCH_RANDOM_SUCCESS,
  payload: user_list
});

export const fetchRandomFailure = error => ({
  type: ChatActionTypes.FETCH_RANDOM_FAILURE,
  payload: error
});

export const createConversasion = (curr_id, aite_id) => ({
  type: ChatActionTypes.CREATE_CONVERSASION_START,
  payload: {curr_id, aite_id},
});

export const createConversasionSuccess = user_list => ({
  type: ChatActionTypes.CREATE_CONVERSASION_SUCCESS,
  payload: user_list
});

export const createConversasionFailure = error => ({
  type: ChatActionTypes.CREATE_CONVERSASION_FAILURE,
  payload: error
});
