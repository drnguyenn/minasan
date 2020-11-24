import React, { forwardRef } from 'react';

import { MessageStyles, Content } from './message.styles';

const Message = forwardRef(({ sender, content, isMyMessage }, ref) => {
  return (
    <MessageStyles isMyMessage={isMyMessage} ref={ref}>
      <Content isMyMessage={isMyMessage}>{content}</Content>
    </MessageStyles>
  );
});

export default Message;
