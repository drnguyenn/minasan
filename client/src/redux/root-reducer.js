import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import chatReducer from './chat/chat.reducer';
import modalReducer from './modal/modal.reducer';
import profileReducer from './profile/profile.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  modal: modalReducer,
  profile: profileReducer
});

export default rootReducer;
