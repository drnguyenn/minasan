import { takeLatest, all, call, put } from 'redux-saga/effects';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  fetchHobbySuccess,
  fetchHobbyFailure,
  fetchIssuesSuccess,
  fetchIssuesFailure,
  updateProfileAvaSuccess,
  updateProfileAvaFailure,
  updateProfileSuccess,
  updateProfileFailure
} from './user.actions';

import * as UserServices from '../../services/user.services';
import * as profileService from '../../services/profile.services';

import { fetchConversations } from '../../services/chat.services';
import { fetchConversationsSuccess } from '../chat/chat.actions';
import UserActionTypes from './user.types';

export function* getCurrentUser() {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      yield put(signInFailure(null));
      return;
    }

    const { user } = yield call(UserServices.getCurrentUser, accessToken);

    if (!user) return;
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(UserServices.signInWithEmail, email, password);

    if (!user) return;

    const accessToken = localStorage.getItem('accessToken');
    const { chat_list } = yield call(fetchConversations, accessToken);

    yield put(signInSuccess(user));
    yield put(fetchConversationsSuccess(chat_list));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    localStorage.removeItem('accessToken');

    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { username, email, password } }) {
  try {
    const { user } = yield call(UserServices.signUp, username, email, password);

    if (!user) return;

    yield put(signUpSuccess({ user }));
    alert('Signed Up Successfully.');
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* fetchIssues() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { issuesList } = yield call(profileService.fetchIssues, accessToken);

    yield put(fetchIssuesSuccess(issuesList));
  } catch (error) {
    yield put(fetchIssuesFailure(error));
  }
}

export function* fetchHobbies() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { hobbyList } = yield call(profileService.fetchHobbies, accessToken);

    yield put(fetchHobbySuccess(hobbyList));
  } catch (error) {
    yield put(fetchHobbyFailure(error));
  }
}

export function* updateProfile({ payload }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    yield call(profileService.updateProfile, accessToken, payload);

    yield put(updateProfileSuccess());
  } catch (error) {
    yield put(updateProfileFailure(error));
  }
}

export function* updateAvatar({ payload }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    yield call(profileService.updateAvatar, accessToken, payload);

    yield put(updateProfileAvaSuccess());
  } catch (error) {
    yield put(updateProfileAvaFailure(error));
  }
}

export function* onGetCurrentUser() {
  yield takeLatest(UserActionTypes.GET_CURRENT_USER, getCurrentUser);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onFetchHobbyStart() {
  yield takeLatest(UserActionTypes.FETCH_HOBBY_START, fetchHobbies);
}

export function* onFetchIssuesStart() {
  yield takeLatest(UserActionTypes.FETCH_ISSUES_START, fetchIssues);
}

export function* onUpdateProfileStart() {
  yield takeLatest(UserActionTypes.UPDATE_PROFILE_START, updateProfile);
}

export function* onUpdateProfileAvaStart() {
  yield takeLatest(UserActionTypes.UPDATE_PROFILE_AVATAR_START, updateAvatar);
}

export function* userSagas() {
  yield all([
    call(onGetCurrentUser),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onFetchHobbyStart),
    call(onFetchIssuesStart),
    call(onUpdateProfileStart),
    call(onUpdateProfileAvaStart)
  ]);
}
