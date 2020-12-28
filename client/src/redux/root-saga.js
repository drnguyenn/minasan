import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { chatSagas } from './chat/chat.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(chatSagas)]);
}
