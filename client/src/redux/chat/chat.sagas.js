import { takeLatest, all, call, put } from 'redux-saga/effects';

import {
  fetchChatContentSuccess,
  fetchChatContentFailure,
  fetchConversationsFailure,
  fetchConversationsSuccess
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

export function* onFetchChatContentStart() {
  yield takeLatest(ChatActionTypes.FETCH_CHAT_CONTENT_START, fetchChatContent);
}

export function* fetchConversations( ) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const {chat} = yield call(ChatServices.fetchConversations, accessToken);
    yield put(fetchConversationsSuccess(chat))
  } catch (error) {
    yield put(fetchConversationsFailure(error))
  }
}

export function* onFetchConversationStart(){
  yield takeLatest(ChatActionTypes.FETCH_CONVERSATIONS_START, fetchConversations);
}

export function* fetchRandom( ) {
  try {
    console.log('fetchRandom')
    const accessToken = localStorage.getItem('accessToken');
    const {chat} = yield call(ChatServices.fetchRandom, accessToken);
    yield put(fetchConversationsSuccess(chat))
  } catch (error) {
    yield put(fetchConversationsFailure(error))
  }
}

export function* onFetchRandom(){
  yield takeLatest(ChatActionTypes.FETCH_RANDOM, fetchRandom);
}


export function* chatSagas() {
  yield all([
    call(onFetchChatContentStart),
    call(onFetchConversationStart),
  ]);
}