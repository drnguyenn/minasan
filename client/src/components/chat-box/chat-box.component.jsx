import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Button, Snackbar } from '@material-ui/core';

import Conversation from '../conversation/conversation.component';
import MessageEditor from '../message-editor/message-editor.component';

import { fetchChatContentStart } from '../../redux/chat/chat.actions';
import { sendMessageStart } from '../../redux/chat/chat.actions';

import socketInterface from '../../socket/socket';

import {
  ChatBoxStyles,
  Header,
  AvatarAndTitle,
  Title
} from './chat-box.styles';

const ChatBox = () => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.chat.connectedUser);
  const currChat = useSelector(state => state.chat.currentChat);
  const currentUser = useSelector(state => state.user.currentUser);
  const partner = useSelector(state => state.chat.currentPartner);

  const [joinRoomMessage, setJoinRoomMessage] = useState('not join room');
  const [receivedMessage, setReceivedMessage] = useState('not received');
  const [newRoomMessage, setNewRoomMessage] = useState('not received');
  const [snackbarStatus, setSnackbarStatus] = useState(false);

  const roomIds = history.map(h => h.id);
  const userId = currentUser.id;

  useEffect(() => {
    if (history.length > 0) {
      // this will call the createConnection Event, which will get the instant of the singleton object socketInterface.
      // the socketInterface will check the private instant socket if created or not. if created, will return the current socket instant.
      // if not, will create a new instant and set all event listener.
      // Becasue there will only be one instant of socketInterface object. there will be no duplicate listener on any event or multiple socket.io connection.
      let connectRoomData = { roomIds, userId };
      socketInterface.createConnectionEvent(
        connectRoomData,
        setJoinRoomMessage,
        setReceivedMessage,
        setNewRoomMessage
      );
    }
    // remove socket when component dismount, may cause error
    return () => {
      socketInterface.onDisconnectEvent();
    };
  }, [history]);

  // handling join room message
  useEffect(() => {
    if (joinRoomMessage) {
      console.log(joinRoomMessage);
    }
  }, [joinRoomMessage]);

  // handling new room message
  useEffect(() => {
    if (newRoomMessage) {
      console.log(newRoomMessage);
    }
  }, [newRoomMessage]);

  // handling receive message
  useEffect(() => {
    // console.log(receivedMessage.message);
    if (receivedMessage.message) {
      if (receivedMessage.roomId === currChat.roomId) {
        dispatch(
          sendMessageStart(receivedMessage.senderId, receivedMessage.message)
        );
      } else {
        setSnackbarStatus(true);
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

    socketInterface.sendMessageEvent(data);
    dispatch(sendMessageStart(currentUser.id, message));
  };

  const handleClose = roomId => {
    setSnackbarStatus(false);
    if (roomId) {
      dispatchEvent(fetchChatContentStart(roomId));
    }
  };

  return (
    <React.Fragment>
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

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        action={
          <Button
            color='secondary'
            size='small'
            onClick={handleClose(receivedMessage.roomId)}
          >
            View
          </Button>
        }
        autoHideDuration={2000}
        open={snackbarStatus}
        onClose={handleClose(null)}
        message={receivedMessage ? receivedMessage.message : ''}
      ></Snackbar>
    </React.Fragment>
  );
};

export default ChatBox;
