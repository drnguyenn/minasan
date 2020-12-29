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
  IntroDescription
} from './conversation.styles';

const Conversation = () => {
  const { isLoading } = useSelector(state => state.chat);

  const { messages } = useSelector(state => state.chat.currentChat);

  const { name, avatarUrl } = useSelector(state => state.chat.currentPartner);

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
        <Avatar
          alt={name}
          src={avatarUrl}
          style={{ width: 100, height: 100 }}
        />
        <IntroTitle>{name}</IntroTitle>
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
