import { takeLatest, all, call, put } from 'redux-saga/effects';

import {
  fetchChatContentSuccess,
  fetchFailure,
  fetchConversationsSuccess,
  fetchSuggestedUsersSuccess,
} from './chat.actions';
import * as ChatServices from '../../services/chat.services';
import ChatActionTypes from './chat.types';

export function* fetchChatContent({ payload }) {
  try {
    const { chat } = yield call(ChatServices.fetchChatContent, payload);
    
    yield put(fetchChatContentSuccess(chat));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* fetchConversations( ) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { chat_list } = yield call(ChatServices.fetchConversations, accessToken);

    yield put(fetchConversationsSuccess(chat_list))
  } catch (error) {
    yield put(fetchFailure(error))
  }
}


export function* FetchSuggestedUsers( ) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const {user_list} = yield call(ChatServices.FetchSuggestedUsers, accessToken);
    yield put(fetchSuggestedUsersSuccess(user_list))
  } catch (error) {
    yield put(fetchFailure(error))
  }
}

export function* createConversation({ payload: { partnerId } }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    yield call(ChatServices.createConversation, accessToken, partnerId)
    const { chat_list } = yield call(ChatServices.fetchConversations, accessToken);

    yield put(fetchConversationsSuccess(chat_list))

  } catch (error) {
    yield put(fetchFailure(error))
  }
}

export function* onFetchChatContentStart() {
  yield takeLatest(ChatActionTypes.FETCH_CHAT_CONTENT_START, fetchChatContent);
}

export function* onFetchSuggestedUsers(){
  yield takeLatest(ChatActionTypes.FETCH_SUGGESTED_START, FetchSuggestedUsers);
}

export function* onCreateConversation(){
  yield takeLatest(ChatActionTypes.CREATE_CONVERSATION_START, createConversation);
}

export function* onFetchConversationStart(){
  yield takeLatest(ChatActionTypes.FETCH_CONVERSATIONS_START, fetchConversations);
}

export function* chatSagas() {
  yield all([
    call(onFetchChatContentStart),
    call(onFetchConversationStart),
    call(onFetchSuggestedUsers),
    call(onCreateConversation),
  ]);
}