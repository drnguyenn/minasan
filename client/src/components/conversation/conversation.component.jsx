import React from 'react';
import { useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';

import Spinner from '../spinner/spinner.component';

import {
  ConversationStyles,
  Introduction,
  IntroTitle,
  IntroDescription
} from './conversation.styles';

const Conversation = () => {
  const { isLoading } = useSelector(state => state.chat);
  const title = useSelector(
    state => state.chat.currentChat && state.chat.currentChat.title
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <ConversationStyles>
      <Introduction>
        <Avatar alt={title} src='' />
        <IntroTitle>{title}</IntroTitle>
        <IntroDescription>Your conversation starts here</IntroDescription>
      </Introduction>
    </ConversationStyles>
  );
};

export default Conversation;
