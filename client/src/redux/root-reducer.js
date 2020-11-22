import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import chatReducer from './chat/chat.reducer';
import modalReducer from './modal/modal.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  modal: modalReducer
});

export default rootReducer;
