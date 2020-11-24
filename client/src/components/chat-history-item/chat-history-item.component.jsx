import React from 'react';
import { useDispatch } from 'react-redux';

import { Avatar } from '@material-ui/core';

import { fetchChatContentStart } from '../../redux/chat/chat.actions';

import { ChatHistoryItemStyles, Title } from './chat-history-item.styles';

const ChatHistoryItem = ({
  avatarUrl,
  title,
  roomId,
  handleClick,
  isSelected
}) => {
  const dispatch = useDispatch();

  return (
    <ChatHistoryItemStyles
      onClick={() => {
        dispatch(fetchChatContentStart(title, roomId));
        handleClick();
      }}
      isSelected={isSelected}
    >
      <Avatar alt={title} src={avatarUrl} />
      <Title>{title}</Title>
    </ChatHistoryItemStyles>
  );
};

export default ChatHistoryItem;
