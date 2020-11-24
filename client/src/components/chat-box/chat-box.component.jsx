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
  const partner = useSelector(state => state.chat.currentPartner);

  const roomIds = history.map(h => h.id);
  const userId = currentUser.id;

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    dispatch(
      fetchChatContentStart(
        partner != null ? partner.name : 'No one here yet',
        history.length ? history[0].id : -1
      )
    );
  }, [dispatch, partner]);

  console.log(currChat);

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
      <MessageEditor sendEvent={sendMessage} />
      {/* <MessageEditor /> */}
    </ChatBoxStyles>
  );
};

export default ChatBox;
