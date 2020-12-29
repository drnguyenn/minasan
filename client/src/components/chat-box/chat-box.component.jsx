import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Button, IconButton, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import Conversation from '../conversation/conversation.component';
import MessageEditor from '../message-editor/message-editor.component';

import { fetchChatContentStart } from '../../redux/chat/chat.actions';
import { sendMessageStart } from '../../redux/chat/chat.actions';

import socketInterface from '../../socket/socket';

import {
  ChatBoxStyles,
  Header,
  AvatarAndTitle,
  Title,
  NewMessageNotiStyles
} from './chat-box.styles';

const ChatBox = () => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.chat.connectedUser);
  const { currentChat, currentPartner } = useSelector(state => state.chat);
  const currentUser = useSelector(state => state.user.currentUser);

  const [joinRoomMessage, setJoinRoomMessage] = useState('not join room');
  const [receivedMessage, setReceivedMessage] = useState('not received');
  const [newRoomMessage, setNewRoomMessage] = useState('not received');
  const [snackbar, setSnackbar] = useState({ open: false });

  const roomIds = history.map(h => h.id);
  const userId = currentUser.id;

  useEffect(() => {
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
    socketInterface.joinRoomsEvent(connectRoomData);
  }, [history, roomIds, userId]);

  useEffect(() => {
    // remove socket when component dismount, may cause error
    return () => {
      socketInterface.onDisconnectEvent();
    };
  }, []);

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
    console.log(receivedMessage);
    if (receivedMessage.message) {
      if (receivedMessage.roomId === currentChat.roomId) {
        dispatch(
          sendMessageStart(receivedMessage.senderId, receivedMessage.message)
        );
      } else {
        setSnackbar(snackbar => ({ ...snackbar, open: true }));
      }
    }
  }, [receivedMessage, dispatch]);

  useEffect(() => {
    dispatch(
      fetchChatContentStart(
        currentPartner ? currentPartner.id : 'No one here yet',
        history.length > 0 ? history[0].id : -1
      )
    );
  }, [dispatch, history]);

  const sendMessage = message => {
    const data = {
      roomId: currentChat.roomId,
      message: message,
      senderId: currentUser.id
    };
    const sendStatus = socketInterface.sendMessageEvent(data);
    if (sendStatus && currentChat.roomId >= 0)
      dispatch(sendMessageStart(currentUser.id, message));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    setSnackbar({ ...snackbar, open: false });
  };

  const NewMessageNoti = ({ sender, content, onClick }) => (
    <NewMessageNotiStyles onClick={onClick}>
      <h4>{sender}</h4>
      <span>
        {content.length < 35 ? content : `${content.substring(0, 34)} ...`}
      </span>
    </NewMessageNotiStyles>
  );

  return (
    <ChatBoxStyles>
      <Header>
        <AvatarAndTitle>
          <Avatar alt={currentPartner.name} src={currentPartner.avatarUrl} />
          <Title>{currentPartner.name}</Title>
        </AvatarAndTitle>
      </Header>
      <Conversation />
      <MessageEditor sendEvent={sendMessage} />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        action={
          <IconButton size='small' color='inherit' onClick={handleClose}>
            <Close fontSize='small' />
          </IconButton>
        }
        // autoHideDuration={8000}
        open={snackbar.open}
        onClose={handleClose}
        message={
          <NewMessageNoti
            sender={receivedMessage.senderName}
            content={receivedMessage.message}
            onClick={() => {
              handleClose();
              dispatch(
                fetchChatContentStart(
                  receivedMessage.senderId,
                  receivedMessage.roomId
                )
              );
            }}
          />
        }
      />
    </ChatBoxStyles>
  );
};

export default ChatBox;
