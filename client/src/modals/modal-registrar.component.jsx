import React from 'react';
import ReactDOM from 'react-dom';

import FindFriendsModal from './find-friends-modal/find-friends-modal.component';
import HobbiesModal from './hobbies-modal/hobbies-modal.component';
import TopicsModal from './topics-modal/topics-modal.component';

const ModalRegistrar = () =>
  ReactDOM.createPortal(
    <>
      <FindFriendsModal />
      <HobbiesModal />
      <TopicsModal />
    </>,
    document.body
  );

export default ModalRegistrar;
