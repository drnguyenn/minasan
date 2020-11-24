import { takeLatest, all, call, put } from 'redux-saga/effects';

import {
  fetchChatContentSuccess,
  fetchChatContentFailure,
  fetchConversationsSuccess,
  fetchConversationsFailure,
  createConversationSuccess,
  createConversationFailure,
  fetchSuggestedUsersSuccess,
  fetchSuggestedUsersFailure,
  sendMessageSuccess,
  sendMessageFailure
} from './chat.actions';
import * as ChatServices from '../../services/chat.services';
import ChatActionTypes from './chat.types';

export function* fetchChatContent({ payload }) {
  try {
    const { chat } = yield call(ChatServices.fetchChatContent, payload);

    yield put(fetchChatContentSuccess(chat));
  } catch (error) {
    yield put(fetchChatContentFailure(error));
  }
}

export function* fetchConversations() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { chat_list } = yield call(
      ChatServices.fetchConversations,
      accessToken
    );

    yield put(fetchConversationsSuccess(chat_list));
  } catch (error) {
    yield put(fetchConversationsFailure(error));
  }
}

export function* fetchSuggestedUsers() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { user_list } = yield call(
      ChatServices.FetchSuggestedUsers,
      accessToken
    );
    yield put(fetchSuggestedUsersSuccess(user_list));
  } catch (error) {
    yield put(fetchSuggestedUsersFailure(error));
  }
}

export function* createConversation({ payload: { currentUserId, partnerId } }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const { con } = yield call(
      ChatServices.createConversation,
      accessToken,
      currentUserId,
      partnerId
    );

    yield put(createConversationSuccess(con));
  } catch (error) {
    yield put(createConversationFailure(error));
  }
}

export function* sendMessage({ payload: { message, conversationId } }) {
  try {
    const sentMessage = yield call(
      ChatServices.sendMessage,
      message,
      conversationId
    );

    yield put(sendMessageSuccess(sentMessage, conversationId));
  } catch (error) {
    yield put(sendMessageFailure(error));
  }
}

export function* onFetchChatContentStart() {
  yield takeLatest(ChatActionTypes.FETCH_CHAT_CONTENT_START, fetchChatContent);
}

export function* onFetchSuggestedUsers() {
  yield takeLatest(
    ChatActionTypes.FETCH_SUGGESTED_USERS_START,
    fetchSuggestedUsers
  );
}

export function* onCreateConversation() {
  yield takeLatest(
    ChatActionTypes.CREATE_CONVERSATION_START,
    createConversation
  );
}

export function* onFetchConversationStart() {
  yield takeLatest(
    ChatActionTypes.FETCH_CONVERSATIONS_START,
    fetchConversations
  );
}

export function* onSendMessageStart() {
  yield takeLatest(ChatActionTypes.SEND_MESSAGE_START, sendMessage);
}

export function* chatSagas() {
  yield all([
    call(onFetchChatContentStart),
    call(onFetchConversationStart),
    call(onFetchSuggestedUsers),
    call(onCreateConversation),
    call(onSendMessageStart)
  ]);
}
