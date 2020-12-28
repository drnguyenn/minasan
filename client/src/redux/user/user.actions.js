import UserActionTypes from './user.types';

export const getCurrentUser = () => ({
  type: UserActionTypes.GET_CURRENT_USER
});

export const emailSignInStart = (email, password) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: { email, password }
});

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const signUpStart = userCredentials => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials
});

export const signUpSuccess = ({ user: { email, password } }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { email, password }
});

export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
});

export const fetchHobbyStart = payload => ({
  type: UserActionTypes.FETCH_HOBBY_START,
  payload: { payload }
});

export const fetchHobbySuccess = hobbyList => ({
  type: UserActionTypes.FETCH_HOBBY_SUCCESS,
  payload: hobbyList
});

export const fetchHobbyFailure = error => ({
  type: UserActionTypes.FETCH_HOBBY_FAILURE,
  payload: error
});

export const fetchIssuesStart = () => ({
  type: UserActionTypes.FETCH_ISSUES_START
});

export const fetchIssuesSuccess = issuesList => ({
  type: UserActionTypes.FETCH_ISSUES_SUCCESS,
  payload: issuesList
});

export const fetchIssuesFailure = error => ({
  type: UserActionTypes.FETCH_ISSUES_FAILURE,
  payload: error
});

export const updateProfileStart = userProfile => ({
  type: UserActionTypes.UPDATE_PROFILE_START,
  payload: userProfile
});

export const updateProfileSuccess = userProfile => ({
  type: UserActionTypes.UPDATE_PROFILE_SUCCESS,
  payload: userProfile
});

export const updateProfileFailure = error => ({
  type: UserActionTypes.UPDATE_PROFILE_AVATAR_FAILURE,
  payload: error
});

export const updateProfileAvatarStart = userProfile => ({
  type: UserActionTypes.UPDATE_PROFILE_AVATAR_START,
  payload: userProfile
});

export const updateProfileAvatarSuccess = userList => ({
  type: UserActionTypes.UPDATE_PROFILE_AVATAR_SUCCESS,
  payload: userList
});

export const updateProfileAvatarFailure = error => ({
  type: UserActionTypes.UPDATE_PROFILE_AVATAR_FAILURE,
  payload: error
});
