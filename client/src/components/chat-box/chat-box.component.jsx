import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import { Avatar } from '@material-ui/core';

import Conversation from '../conversation/conversation.component';
import MessageEditor from '../message-editor/message-editor.component';

import { fetchChatContentStart } from '../../redux/chat/chat.actions';
import { fetchConversationsStart } from '../../redux/chat/chat.actions';

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
  const currChat = useSelector(state => state.chat.currentChat);
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

      socket.on('new-room', fetchConversationsStart());
      connected = true;
    }

    // dispatch(fetchChatContentStart(partner.id, history[0].id));
  }, [dispatch, currentUser]);

  const sendMessage = mes => {
    console.log('runthis');
    const data = {
      roomId: 1,
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
      <MessageEditor sendEvent={sendMessage} />
      {/* <MessageEditor /> */}
    </ChatBoxStyles>
  );
};

export default ChatBox;
