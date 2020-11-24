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

import { socket } from '../../socket/socket';

const ChatBox = () => {
  const dispatch = useDispatch();
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

  let connected = false;

  useEffect(() => {
    if (!connected) {
      socket.on('connect', () => {
        socket.emit('join-rooms', { roomIds, userId });
      });

      socket.on('joined-room', room_id =>
        console.log(`joined room id: ${room_id}`)
      );

      socket.on('broadcast-message', data => {
        console.log(data);
      });
      connected = true;
    }
    dispatch(
      fetchChatContentStart(
        partner != null ? partner.name : 'There is no one here',
        history[0].id
      )
    );
  }, [partner]);

  const currChat = useSelector(state => state.chat.currentChat);

  const [messages, setMessages] = useState([]);

  const sendMessage = mes => {
    const data = {
      roomId: currChat.roomId,
      message: mes,
      senderId: currentUser.id
    };

    socket.emit('send-message', data);
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
