import React from 'react';

import { MessageStyles, Content } from './message.styles';

const Message = ({ sender, content, isMyMessage }) => {
  return (
    <MessageStyles isMyMessage={isMyMessage}>
      <Content isMyMessage={isMyMessage}>{content}</Content>
    </MessageStyles>
  );
};

export default Message;
