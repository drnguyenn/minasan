import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

import io from 'socket.io-client';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const socket = io(BASE_URL);

const ChatBox = () => {
  const dispatch = useDispatch();
  const [debug, setDebug] = useState(0);
  const history = useSelector(state => state.chat.chatHistory);
  const currentUser = useSelector(state => state.user.currentUser);
  let partner = null;
  if (history.length > 0) {
    partner =
      history[0].user1.id === currentUser.id
        ? history[0].user2
        : history[0].user1;
  }

  const roomIds = history.map(h => h.id);
  const userId = currentUser.id;

  useEffect(() => {
    dispatch(
      fetchChatContentStart(
        partner != null ? partner.name : 'There is no one here',
        history[0].id
      )
    );
  }, [partner]);

  socket.on('connect', () => {
    // console.log('connected');
    socket.emit('join-rooms', { roomIds, userId });
  });

  socket.on('joined-room', room_id =>
    console.log(`joined room id: ${room_id}`)
  );

  socket.on('broadcast-message', data => {
    console.log(data);
  });

  const currChat = useSelector(state => state.chat.currentChat);

  const [messages, setMessages] = useState([]);
  console.log(`list of room ${history}`);

  const sendMessage = mes => {
    const data = {
      debug: debug,
      roomId: currChat.roomId,
      message: mes,
      senderId: currentUser.id
    };

    setDebug(debug + 1);

    socket.emit('send-message', data);
    console.log(mes);
  };

  return (
    <ChatBoxStyles>
      <Header>
        <AvatarAndTitle>
          <Avatar alt={currChat.title} src='' />
          <Title>{currChat.title}</Title>
        </AvatarAndTitle>
      </Header>
      <Conversation />
      <MessageEditor
        onSend={(isSender, text) => {
          sendMessage(text);
          setMessages([...messages, { isSender, text }]);
        }}
      />
    </ChatBoxStyles>
  );
};

export default ChatBox;
