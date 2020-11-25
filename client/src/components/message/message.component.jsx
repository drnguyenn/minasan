import React, { forwardRef } from 'react';

import { MessageStyles, Content } from './message.styles';

const Message = forwardRef(({ senderId, message, isMyMessage }, ref) => {
  return (
    <MessageStyles isMyMessage={isMyMessage} ref={ref}>
      <Content isMyMessage={isMyMessage}>{message}</Content>
    </MessageStyles>
  );
});

export default Message;
