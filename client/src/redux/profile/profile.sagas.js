import { takeLatest, all, call, put } from 'redux-saga/effects';

import * as profileAction from './profile.action';

import * as profileService from '../../services/profile.services';
import ProfileActionTypes from './profile.types';

export function* fetchIssues() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { issuesList } = yield call(profileService.fetchIssues, accessToken);

    yield put(profileAction.fetchIssuesSuccess(issuesList));
  } catch (error) {
    yield put(profileAction.fetchIssuesFailure(error));
  }
}

export function* fetchHobbies() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { hobbyList } = yield call(profileService.fetchHobbies, accessToken);

    yield put(profileAction.fetchHobbySuccess(hobbyList));
  } catch (error) {
    yield put(profileAction.fetchHobbyFailure(error));
  }
}

export function* fetchProfile() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { userProfile } = yield call(
      profileService.fetchProfile,
      accessToken
    );
    yield put(profileAction.fetchProfileSuccess(userProfile));
  } catch (error) {
    yield put(profileAction.fetchProfileFailure(error));
  }
}

export function* updateProfile({ payload }) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    yield call(profileService.updateProfile, accessToken, payload);

    yield put(profileAction.updateProfileUpdate());
  } catch (error) {
    yield put(profileAction.updateProfileFailure(error));
  }
}

export function* onFetchHobbyStart() {
  yield takeLatest(ProfileActionTypes.FETCH_HOBBY_START, fetchHobbies);
}

export function* onFetchIssuesStart() {
  yield takeLatest(ProfileActionTypes.FETCH_ISSUES_START, fetchIssues);
}

export function* onUpdateProfileStart() {
  yield takeLatest(ProfileActionTypes.UPDATE_PROFILE_START, updateProfile);
}

export function* onFetchProfileStart() {
  yield takeLatest(ProfileActionTypes.FETCH_PROFILE_START, fetchProfile);
}

export function* profileSagas() {
  yield all([
    call(onFetchHobbyStart),
    call(onFetchIssuesStart),
    call(onUpdateProfileStart),
    call(onFetchProfileStart)
  ]);
}
