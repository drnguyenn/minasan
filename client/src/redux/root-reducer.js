import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import chatReducer from './chat/chat.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer
});

export default rootReducer;
