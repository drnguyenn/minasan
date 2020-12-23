import ProfileActionTypes from './profile.types';

export const fetchHobbyStart = payload => ({
  type: ProfileActionTypes.FETCH_HOBBY_START,
  payload: { payload }
});

export const fetchHobbySuccess = hobbyList => ({
  type: ProfileActionTypes.FETCH_HOBBY_SUCCESS,
  payload: hobbyList
});

export const fetchHobbyFailure = error => ({
  type: ProfileActionTypes.FETCH_HOBBY_FAILURE,
  payload: error
});

export const fetchIssuesStart = () => ({
  type: ProfileActionTypes.FETCH_ISSUES_START
});

export const fetchIssuesSuccess = issuesList => ({
  type: ProfileActionTypes.FETCH_ISSUES_SUCCESS,
  payload: { issuesList }
});

export const fetchIssuesFailure = error => ({
  type: ProfileActionTypes.FETCH_ISSUES_FAILURE,
  payload: error
});

export const fetchProfileStart = () => ({
  type: ProfileActionTypes.FETCH_PROFILE_START
});

export const fetchProfileSuccess = userProfile => ({
  type: ProfileActionTypes.FETCH_PROFILE_SUCCESS,
  payload: userProfile
});

export const fetchProfileFailure = error => ({
  type: ProfileActionTypes.FETCH_PROFILE_FAILURE,
  payload: error
});

export const updateProfileStart = userProfile => ({
  type: ProfileActionTypes.UPDATE_PROFILE_START,
  payload: userProfile
});

export const updateProfileUpdate = userList => ({
  type: ProfileActionTypes.UPDATE_PROFILE_SUCCESS,
  payload: userList
});

export const updateProfileFailure = error => ({
  type: ProfileActionTypes.UPDATE_PROFILE_FAILURE,
  payload: error
});
