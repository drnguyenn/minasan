import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';

import Conversation from '../conversation/conversation.component';
import MessageEditor from '../message-editor/message-editor.component';

import { fetchChatContentStart } from '../../redux/chat/chat.actions';
import { sendMessageStart } from '../../redux/chat/chat.actions';

import {
  ChatBoxStyles,
  Header,
  AvatarAndTitle,
  Title
} from './chat-box.styles';

import { Socket } from '../../socket/socket';

// import io from 'socket.io-client';

// const BASE_URL = process.env.REACT_APP_BASE_URL;
// const socket = io(BASE_URL);

const ChatBox = () => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.chat.connectedUser);
  const currChat = useSelector(state => state.chat.currentChat);
  const currentUser = useSelector(state => state.user.currentUser);
  const partner = useSelector(state => state.chat.currentPartner);

  const roomIds = history.map(h => h.id);
  const userId = currentUser.id;

  const socket = Socket;

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join-rooms', { roomIds, userId });
    });

    socket.on('joined-room', message =>
      console.log(`joined room id: ${message}`)
    );

    socket.on('broadcast-message', data => {
      if (data.roomId === currChat.roomId) {
        dispatch(sendMessageStart(data.senderId, data.message));
      }
    });
    // }, [socket.connected, dispatch, currChat.roomId, roomIds, userId]);
  }, [socket.connected, dispatch]);

  useEffect(() => {
    dispatch(
      fetchChatContentStart(
        partner ? partner.name : 'No one here yet',
        history.length > 0 ? history[0].id : -1
      )
    );
  }, [dispatch, partner, history]);

  const sendMessage = message => {
    const data = {
      roomId: currChat.roomId,
      message: message,
      senderId: currentUser.id
    };
    socket.emit('send-message', data);

    dispatch(sendMessageStart(currentUser.id, message));
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
    </ChatBoxStyles>
  );
};

export default ChatBox;
