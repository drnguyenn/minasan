import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import { Avatar } from '@material-ui/core';

import Conversation from '../conversation/conversation.component';
import MessageEditor from '../message-editor/message-editor.component';

import { fetchChatContentStart } from '../../redux/chat/chat.actions';

import {
  ChatBoxStyles,
  Header,
  AvatarAndTitle,
  Title
} from './chat-box.styles';

const ChatBox = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const socket = io();

  useEffect(() => {
    dispatch(fetchChatContentStart(user.username));
  }, [dispatch, user]);

  const { title } = useSelector(state => state.chat.currentChat);

  return (
    <ChatBoxStyles>
      <Header>
        <AvatarAndTitle>
          <Avatar alt={title} src='' />
          <Title>{title}</Title>
        </AvatarAndTitle>
      </Header>
      <Conversation />
      <MessageEditor />
    </ChatBoxStyles>
  );
};

export default ChatBox;
