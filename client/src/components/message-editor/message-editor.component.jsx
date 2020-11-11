import React from 'react';

import { Fab } from '@material-ui/core';
import { Send } from '@material-ui/icons';

import { MessageEditorStyles, Input } from './message-editor.styles';

const handleSubmit = async event => {
  event.preventDefault();
};

const MessageEditor = () => {
  return (
    <MessageEditorStyles>
      <Input type='text' placeholder='Say something...' />
      <Fab variant='extended' color='primary' onClick={handleSubmit}>
        <Send />
        Send
      </Fab>
    </MessageEditorStyles>
  );
};

export default MessageEditor;
