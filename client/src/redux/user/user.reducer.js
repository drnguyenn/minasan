import UserActionTypes from './user.types';

const INITIAL_STATE = {
  hobbyList: [],
  issuesList: [],
  currentUser: null,
  isLoading: true,
  isProfileUpdating: false,
  isAvatarUploading: false,
  error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.GET_CURRENT_USER:
    case UserActionTypes.EMAIL_SIGN_IN_START:
    case UserActionTypes.SIGN_OUT_START:
      return {
        ...state,
        isLoading: true
      };

    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
        error: null
      };

    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
        error: null
      };

    case UserActionTypes.FETCH_HOBBY_START:
      return {
        ...state
      };

    case UserActionTypes.FETCH_HOBBY_SUCCESS:
      return {
        ...state,
        hobbyList: action.payload,
        error: null
      };

    case UserActionTypes.FETCH_ISSUES_START:
      return {
        ...state
      };

    case UserActionTypes.FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        issuesList: action.payload,
        error: null
      };

    case UserActionTypes.UPDATE_PROFILE_START:
      return {
        ...state,
        isProfileUpdating: true
      };

    case UserActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
        isProfileUpdating: false
      };

    case UserActionTypes.UPDATE_PROFILE_AVATAR_START:
      return {
        ...state,
        isAvatarUploading: true
      };

    case UserActionTypes.UPDATE_PROFILE_AVATAR_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
        isAvatarUploading: false
      };

    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.FETCH_HOBBY_FAILURE:
    case UserActionTypes.FETCH_ISSUES_FAILURE:
    case UserActionTypes.UPDATE_PROFILE_FAILURE:
    case UserActionTypes.UPDATE_PROFILE_AVATAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
