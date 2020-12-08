import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';

import Conversation from '../conversation/conversation.component';
import MessageEditor from '../message-editor/message-editor.component';

import { fetchChatContentStart } from '../../redux/chat/chat.actions';
import { sendMessageStart } from '../../redux/chat/chat.actions';

import socketObject from '../../socket/socket';

import {
  ChatBoxStyles,
  Header,
  AvatarAndTitle,
  Title
} from './chat-box.styles';

// import io from 'socket.io-client';

// const BASE_URL = process.env.REACT_APP_BASE_URL;
// const socket = io(BASE_URL);

const ChatBox = () => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.chat.connectedUser);
  const currChat = useSelector(state => state.chat.currentChat);
  const currentUser = useSelector(state => state.user.currentUser);
  const partner = useSelector(state => state.chat.currentPartner);

  const [joinRoomMessage, setJoinRoomMessage] = useState('not join room');
  const [receivedMessage, setReceivedMessage] = useState('not received');
  const [newRoomMessage, setNewRoomMessage] = useState('not received');

  const roomIds = history.map(h => h.id);
  const userId = currentUser.id;

  useEffect(() => {
    if (history.length > 0) {
      let connectRoomData = { roomIds, userId };
      socketObject.createConnectionEvent(
        connectRoomData,
        setJoinRoomMessage,
        setReceivedMessage,
        setNewRoomMessage
      );
    }
    // return () => {
    //   socketObject.onDisconnectEvent();
    // };
  }, [history]);

  // handling join room message
  useEffect(() => {
    if (joinRoomMessage != '') {
      console.log(joinRoomMessage);
    }
  }, [joinRoomMessage]);

  // handling new room message
  useEffect(() => {
    if (newRoomMessage != '') {
      console.log(newRoomMessage);
    }
  }, [newRoomMessage]);

  // handling receive message
  useEffect(() => {
    if (receivedMessage != '') {
      console.log(receivedMessage);
      if (receivedMessage.roomId === currChat.roomId) {
        dispatch(
          sendMessageStart(receivedMessage.senderId, receivedMessage.message)
        );
      }
    }
  }, [receivedMessage]);

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
    // socket.emit('send-message', data);
    socketObject.sendMessageEvent(data);

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
