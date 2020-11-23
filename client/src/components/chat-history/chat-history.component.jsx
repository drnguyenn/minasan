import React, { useState } from 'react';

import ChatSearchBar from '../chat-search-bar/chat-search-bar.component';
import ChatHistoryItem from '../chat-history-item/chat-history-item.component';

import { ChatHistoryStyles, ItemList } from './chat-history.styles';

const ChatHistory = () => {
  const [currentChatId, setCurrentChatId] = useState('long.nd');

  return (
    <ChatHistoryStyles>
      <ChatSearchBar />
      <ItemList>
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
      </ItemList>
    </ChatHistoryStyles>
  );
};

export default ChatHistory;
