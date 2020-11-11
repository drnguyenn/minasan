import { takeLatest, all, call, put } from 'redux-saga/effects';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure
  // signUpSuccess,
  // signUpFailure
} from './user.actions';
import { signInWithEmailAndPassword } from '../../services/user.services';
import UserActionTypes from './user.types';

export function* isUserAuthenticated() {
  // try {
  //   const userAuth = yield call(getCurrenUser);
  //   if (!userAuth) return;
  //   yield getSnapshotFromUserAuth(userAuth);
  // } catch (error) {
  //   yield put(signInFailure(error));
  // }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(signInWithEmailAndPassword, email, password);
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    // yield signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  // try {
  //   const { user } = yield createUserWithEmailAndPassword(email, password);
  //   yield put(signUpSuccess({ user, additionalData: { displayName } }));
  // } catch (error) {
  //   yield put(signUpFailure(error));
  // }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  // yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
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

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}
