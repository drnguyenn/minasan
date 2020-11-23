import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';

import Spinner from '../spinner/spinner.component';
import Message from '../message/message.component';

import {
  ConversationStyles,
  Introduction,
  IntroTitle,
  IntroDescription
} from './conversation.styles';


const Conversation = () => {
  const { isLoading } = useSelector(state => state.chat);
  const { title, messages } = useSelector(state => state.chat.currentChat);

  const { currentUser } = useSelector(state => state.user);

  const conversationEndRef = useRef(null);

  useEffect(() => {
    conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [title]);

  return isLoading ? (
    <Spinner />
  ) : (
    <ConversationStyles>
      <Introduction>
        <Avatar alt={title} src='' />
        <IntroTitle>{title}</IntroTitle>
        <IntroDescription>Your conversation starts here</IntroDescription>
      </Introduction>
      {messages.map(({ id, sender, ...otherProps }) => (
        <Message
          key={id}
          isMyMessage={sender === currentUser.username}
          sender={sender}
          {...otherProps}
        />
      ))}
      <div ref={conversationEndRef} />
    </ConversationStyles>
  );
};

export default Conversation;
