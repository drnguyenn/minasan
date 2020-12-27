import ProfileActionTypes from './profile.types';

const INITIAL_STATE = {
  userProfile: {},
  hobbyList: [],
  issuesList: [],
  isLoading: false,
  isSending: false,
  error: null
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfileActionTypes.FETCH_HOBBY_START:
      return {
        ...state,
        isLoading: true
      };

    case ProfileActionTypes.FETCH_HOBBY_SUCCESS:
      return {
        ...state,
        hobbyList: action.payload,
        isLoading: false,
        error: null
      };

    case ProfileActionTypes.FETCH_ISSUES_START:
      return {
        ...state,
        isLoading: true
      };

    case ProfileActionTypes.FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        issuesList: action.payload,
        isLoading: false,
        error: null
      };

    case ProfileActionTypes.UPDATE_PROFILE_START:
      return {
        ...state,
        isLoading: true
      };

    case ProfileActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case ProfileActionTypes.FETCH_HOBBY_FAILURE:
    case ProfileActionTypes.FETCH_ISSUES_FAILURE:
    case ProfileActionTypes.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSending: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default profileReducer;
