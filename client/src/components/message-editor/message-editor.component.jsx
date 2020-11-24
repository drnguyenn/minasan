import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Fab } from '@material-ui/core';
import { Send } from '@material-ui/icons';

import { sendMessageStart } from '../../redux/chat/chat.actions';

import { MessageEditorStyles, Input } from './message-editor.styles';

const MessageEditor = ({ sendEvent }) => {
  const [text, setText] = useState('');

  const { currentUser } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    setText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    sendEvent(text);
    dispatch(
      sendMessageStart({ sender: currentUser.username, content: text }, '')
    );

    setText('');
  };

  const onEnterPress = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      handleSubmit(event);
    }
  };

  return (
    <MessageEditorStyles onSubmit={handleSubmit} id=''>
      <Input
        value={text}
        onChange={handleInputChange}
        type='text'
        placeholder='Say something...'
        onKeyDown={onEnterPress}
      />
      <Fab
        type='submit'
        variant='extended'
        color='primary'
        disabled={text.length === 0}
      >
        <Send />
        Send
      </Fab>
    </MessageEditorStyles>
  );
};

export default MessageEditor;
