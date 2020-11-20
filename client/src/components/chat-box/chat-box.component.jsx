import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';

import Conversation from '../conversation/conversation.component';
import MessageEditor from '../message-editor/message-editor.component';
import ChatView from '../chat-view/chat-view.component'
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

  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')

  return (
    <ChatBoxStyles>
      <Header>
        <AvatarAndTitle>
          <Avatar alt={title} src='' />
          <Title>{title}</Title>
        </AvatarAndTitle>
      </Header>
      <Conversation messages={messages} />
      <MessageEditor onSend={(isSender, text) => {setMessages([...messages, {isSender, text}])}} />
    </ChatBoxStyles>
  );
};

export default ChatBox;
