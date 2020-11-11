import React, { useState } from 'react';

import ChatHistoryItem from '../chat-history-item/chat-history-item.component';

import { ChatHistoryStyles } from './chat-history.styles';

const ChatHistory = () => {
  const [currentChatId, setCurrentChatId] = useState('long.nd');

  return (
    <ChatHistoryStyles>
      <ChatHistoryItem
        title='long.nd'
        handleClick={() => setCurrentChatId('long.nd')}
        isSelected={currentChatId === 'long.nd'}
      />
      <ChatHistoryItem
        title='duong.lh'
        handleClick={() => setCurrentChatId('duong.lh')}
        isSelected={currentChatId === 'duong.lh'}
      />
      <ChatHistoryItem
        title='cuong.pv'
        handleClick={() => setCurrentChatId('cuong.pv')}
        isSelected={currentChatId === 'cuong.pv'}
      />
    </ChatHistoryStyles>
  );
};

export default ChatHistory;
