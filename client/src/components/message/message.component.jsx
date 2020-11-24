import React from 'react';

import { MessageStyles, Content } from './message.styles';

const Message = ({ sender, message, isMyMessage }) => {
  return (
    <MessageStyles isMyMessage={isMyMessage}>
      <Content isMyMessage={isMyMessage}>{message}</Content>
    </MessageStyles>
  );
};

export default Message;
