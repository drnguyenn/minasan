import React, { useState } from 'react';

import { Fab } from '@material-ui/core';
import { Send } from '@material-ui/icons';

import { MessageEditorStyles, Input } from './message-editor.styles';



const MessageEditor = ({ onSend }) => {
  const [text, setText] = useState('')
  const handleSubmit = async event => {
    event.preventDefault();
    onSend(true, text);
    setText('');
  };
  
  const handleInputChange = event => {
    event.preventDefault();
    setText(event.target.value);
  }
  return (
    <MessageEditorStyles>
      <Input value={text} onChange={handleInputChange} type='text' placeholder='Say something...' />
      <Fab variant='extended' color='primary' onClick={handleSubmit}>
        <Send />
        Send
      </Fab>
    </MessageEditorStyles>
  );
};

export default MessageEditor;
