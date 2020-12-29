import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import FlipMove from 'react-flip-move';

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
  const { isLoading } = useSelector(state => state.chat);

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
        <Avatar />
        <IntroTitle>{title}</IntroTitle>
        <IntroDescription>Your conversation starts here</IntroDescription>
      </Introduction>
      <FlipMove>
        {messages.map(({ id, senderId, ...otherProps }, index) => (
          <Message
            key={index}
            isMyMessage={senderId === currentUser.id}
            senderId={senderId}
            {...otherProps}
          />
        ))}
      </FlipMove>
      {/* {messages.length ? (
        <MessageStatus>
          {isSending ? 'Sending...' : error ? 'Error' : 'Sent'}
        </MessageStatus>
      ) : null} */}
      <div ref={conversationEndRef} />
    </ConversationStyles>
  );
};

export default Conversation;
