import { takeLatest, all, call, put } from 'redux-saga/effects';

import {
  fetchChatContentSuccess,
  fetchChatContentFailure,
  fetchConversationsFailure,
  fetchConversationsSuccess,
  fetchRandomFailure,
  fetchRandomSuccess,
  createConversasionSuccess,
  createConversasionFailure,

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
    const accessToken = localStorage.getItem('accessToken');
    const {user_list} = yield call(ChatServices.fetchRandom, accessToken);
    // console.log(user_list)
    yield put(fetchRandomSuccess(user_list))
  } catch (error) {
    yield put(fetchRandomFailure(error))
  }
}

export function* onFetchRandom(){
  yield takeLatest(ChatActionTypes.FETCH_RANDOM_START, fetchRandom);
}

export function* createConversasion({ payload: { curr_id, aite_id } }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const {con} = yield call(ChatServices.createConversation, accessToken, curr_id, aite_id)

    yield put(createConversasionSuccess('z'))
  } catch (error) {
    yield put(createConversasionFailure(error))
  }
}

export function* onCreateConversasion(){
  yield takeLatest(ChatActionTypes.CREATE_CONVERSASION_START, createConversasion);
}


export function* chatSagas() {
  yield all([
    call(onFetchChatContentStart),
    call(onFetchConversationStart),
    call(onFetchRandom),
    call(onCreateConversasion),
  ]);
}