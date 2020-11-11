import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';

import Conversation from '../conversation/conversation.component';

import { fetchChatContentStart } from '../../redux/chat/chat.actions';

import {
  ChatBoxStyles,
  Header,
  AvatarAndTitle,
  Title
} from './chat-box.styles';

const ChatBox = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatContentStart('long.nd'));
  }, [dispatch]);

  const title = useSelector(
    state => state.chat.currentChat && state.chat.currentChat.title
  );

  return (
    <ChatBoxStyles>
      <Header>
        <AvatarAndTitle>
          <Avatar alt={title} src='' />
          <Title>{title}</Title>
        </AvatarAndTitle>
      </Header>
      <Conversation />
    </ChatBoxStyles>
  );
};

export default ChatBox;
