import { takeLatest, all, call, put } from 'redux-saga/effects';

import {
  fetchChatContentSuccess,
  fetchChatContentFailure,
  fetchConversationsSuccess,
  fetchConversationsFailure,
  // createConversationSuccess,
  createConversationFailure,
  fetchSuggestedUsersSuccess,
  fetchSuggestedUsersFailure,
  sendMessageSuccess,
  sendMessageFailure
} from './chat.actions';
import * as ChatServices from '../../services/chat.services';
import { getCurrentUser } from '../../services/user.services';
import ChatActionTypes from './chat.types';

export function* fetchChatContent({ payload }) {
  console.log('fetch chat content');
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { receiverId, roomId } = payload;
    const { chat, currentPartner } = yield call(
      ChatServices.fetchChatContent,
      accessToken,
      receiverId,
      roomId
    );
    // const { chat } = yield call(ChatServices.fetchChatContent, payload);
    yield put(fetchChatContentSuccess({ chat, currentPartner }));
  } catch (error) {
    yield put(fetchChatContentFailure(error));
  }
}

export function* fetchConversations({ payload }) {
  try {
    const { currentUserId } = payload;
    const accessToken = localStorage.getItem('accessToken');
    const { chat_list } = yield call(
      ChatServices.fetchConversations,
      accessToken
    );
    const currPartner =
      chat_list[0].user1.id === currentUserId
        ? chat_list[0].user2
        : chat_list[0].user1;

    yield put(fetchConversationsSuccess(chat_list, currPartner));
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

export function* createConversation({ payload }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    yield call(ChatServices.createConversation, accessToken, payload);

    const { chat_list } = yield call(
      ChatServices.fetchConversations,
      accessToken
    );
    const { user } = yield call(getCurrentUser, accessToken);

    yield put(fetchConversationsSuccess(chat_list, user));
  } catch (error) {
    yield put(createConversationFailure(error));
  }
}

export function* sendMessage({ payload: { message, senderId } }) {
  try {
    yield put(sendMessageSuccess(message, senderId));
  } catch (error) {
    yield put(sendMessageFailure(error));
  }
}

export function* onFetchChatContentStart() {
  yield takeLatest(ChatActionTypes.FETCH_CHAT_CONTENT_START, fetchChatContent);
}

export function* onFetchSuggestedUsersStart() {
  yield takeLatest(
    ChatActionTypes.FETCH_SUGGESTED_USERS_START,
    fetchSuggestedUsers
  );
}

export function* onCreateConversationStart() {
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
    call(onFetchSuggestedUsersStart),
    call(onCreateConversationStart),
    call(onSendMessageStart)
  ]);
}
