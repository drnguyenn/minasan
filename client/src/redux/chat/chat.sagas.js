import { takeLatest, all, call, put } from 'redux-saga/effects';

import {
  fetchChatContentSuccess,
  fetchFailure,
  fetchConversationsSuccess,
  createConversasionSuccess,

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
    // console.log(chat_list)

    yield put(fetchConversationsSuccess(chat_list))
  } catch (error) {
    yield put(fetchFailure(error))
  }
}

export function* onFetchConversationStart(){
  yield takeLatest(ChatActionTypes.FETCH_CONVERSATIONS_START, fetchConversations);
}

export function* FetchSuggestedUsers( ) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const {user_list} = yield call(ChatServices.FetchSuggestedUsers, accessToken);
    // console.log(user_list)
    yield put(fetchSuggestedUsersSuccess(user_list))
  } catch (error) {
    yield put(fetchFailure(error))
  }
}

export function* createConversasion({ payload: { currentUserId, partnerId } }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const {con} = yield call(ChatServices.createConversation, accessToken, currentUserId, partnerId)

    // console.log(con)
    yield put(createConversasionSuccess(con))
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

export function* onCreateConversasion(){
  yield takeLatest(ChatActionTypes.CREATE_CONVERSASION_START, createConversasion);
}


export function* chatSagas() {
  yield all([
    call(onFetchChatContentStart),
    call(onFetchConversationStart),
    call(onFetchSuggestedUsers),
    call(onCreateConversasion),
  ]);
}