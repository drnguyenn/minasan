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
    // console.log(payload)
    const { chat } = yield call(ChatServices.fetchChatContent, payload);
    yield put(fetchChatContentSuccess(chat));
  } catch (error) {
    yield put(fetchChatContentFailure(error));
  }
}

export function* onFetchChatContentStart() {
  yield takeLatest(ChatActionTypes.FETCH_CHAT_CONTENT_START, fetchChatContent);
}

export function* chatSagas() {
  yield all([call(onFetchChatContentStart)]);
}


export function* fetchConversations( {payload}) {
  try {
    console.log(payload)
    const chat = null;
    yield put(fetchConversationsSuccess(chat))
  } catch (error) {
    yield put(fetchConversationsFailure(error))
  }
}

export function* onFetchConversationStart(){
  yield takeLatest(ChatActionTypes.fetchConversationsStart, fetchConversations);
}