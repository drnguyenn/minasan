import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversationsStart } from '../../redux/chat/chat.actions';

import ChatSearchBar from '../chat-search-bar/chat-search-bar.component';
import ChatHistoryItem from '../chat-history-item/chat-history-item.component';

import { ChatHistoryStyles, ItemList } from './chat-history.styles';

const ChatHistory = () => {
  const dispatch = useDispatch();

  const partner = useSelector(state => state.chat.currentPartner);
  const chat_history = useSelector(state => state.chat.chatHistory);

  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => {
    if (partner != null) {
      setCurrentChatId(partner.id);
    }
  }, [partner]);

  const partnersList = chat_history.map(h => {
    return (
      <ChatHistoryItem
        key={h.id}
        title={h.user2.name.toString()}
        handleClick={() => setCurrentChatId(h.user2.id)}
        isSelected={currentChatId === h.user2.id}
      />
    );
  });

  return (
    <ChatHistoryStyles>
      <ChatSearchBar />
      <ItemList>{partnersList}</ItemList>
    </ChatHistoryStyles>
  );
};

export default ChatHistory;
