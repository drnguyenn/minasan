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
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { receiverId, roomId } = payload;

    const { chat, currentPartner } = yield call(
      ChatServices.fetchChatContent,
      accessToken,
      receiverId,
      roomId
    );
    yield put(fetchChatContentSuccess({ chat, currentPartner }));
  } catch (error) {
    yield put(fetchChatContentFailure(error));
  }
}

export function* fetchConversations({ payload }) {
  try {
    const { currentUserId } = payload;
    const accessToken = localStorage.getItem('accessToken');

    const { chatList } = yield call(
      ChatServices.fetchConversations,
      accessToken
    );

    // flag -2 for no changes in current partner, -1 is default value of the call
    const currentPartner =
      currentUserId !== -2
        ? chatList.length > 0
          ? chatList[0].user1.id === currentUserId
            ? chatList[0].user2
            : chatList[0].user1
          : {}
        : null;

    yield put(fetchConversationsSuccess(chatList, currentPartner));
  } catch (error) {
    yield put(fetchConversationsFailure(error));
  }
}

export function* createConversation({ payload }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const { roomInfo } = yield call(
      ChatServices.createConversation,
      accessToken,
      payload
    );

    const { chatList } = yield call(
      ChatServices.fetchConversations,
      accessToken
    );
    const { user } = yield call(getCurrentUser, accessToken);

    const currentPartner =
      chatList.length > 0
        ? chatList[0].user1.id === user.id
          ? chatList[0].user2
          : chatList[0].user1
        : {};

    yield put(fetchConversationsSuccess(chatList, currentPartner));
  } catch (error) {
    yield put(createConversationFailure(error));
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
