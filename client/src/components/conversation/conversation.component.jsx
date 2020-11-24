import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';

import Spinner from '../spinner/spinner.component';
import Message from '../message/message.component';

import {
  ConversationStyles,
  Introduction,
  IntroTitle,
  IntroDescription,
  MessageStatus
} from './conversation.styles';

const Conversation = () => {
  const { isLoading, isSending, error } = useSelector(state => state.chat);

  const { title, messages } = useSelector(state => state.chat.currentChat);

  const { currentUser } = useSelector(state => state.user);

  const conversationEndRef = useRef(null);

  useEffect(() => {
    conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return isLoading ? (
    <div>
      <Spinner />
      <div ref={conversationEndRef} />
    </div>
  ) : (
    <ConversationStyles>
      <Introduction>
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
      <MessageStatus>
        {isSending ? 'Sending...' : error ? 'Error' : 'Sent'}
      </MessageStatus>
      <div ref={conversationEndRef} />
    </ConversationStyles>
  );
};

export default Conversation;
