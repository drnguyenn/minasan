import React from 'react';
import { useSelector } from 'react-redux';

import ChatHistory from '../../components/chat-history/chat-history.component';
import ChatBox from '../../components/chat-box/chat-box.component';

import { HomePageStyles } from './homepage.styles';

const HomePage = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  return currentUser ? (
    <HomePageStyles>
      <ChatHistory />
      <ChatBox />
    </HomePageStyles>
  ) : null;
};

export default HomePage;
