import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversationsStart } from '../../redux/chat/chat.actions';

import ChatSearchBar from '../chat-search-bar/chat-search-bar.component';
import ChatHistoryItem from '../chat-history-item/chat-history-item.component';
import { UserSent } from '../chat-view/chat-view.styles';

import { ChatHistoryStyles, ItemList } from './chat-history.styles';

const ChatHistory = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.currentUser);
  const chat_history = useSelector(state => state.chat.chatHistory);

  const [currentChatId, setCurrentChatId] = useState(user.name);
  useEffect(() => {
    dispatch(fetchConversationsStart());
  }, [dispatch]);
  console.log(chat_history);
  const uh = chat_history.map(h => {
    return (
      <ChatHistoryItem
        key={h.id}
        title={h.user2Id.toString()}
        handleClick={() => setCurrentChatId(h.id)}
        isSelected={currentChatId === h.id}
      />
    );
  });

  return (
    <ChatHistoryStyles>
      <ChatSearchBar />
      <ChatHistoryItem
        title={user.username}
        handleClick={() => setCurrentChatId(user.id)}
        isSelected={currentChatId === user.id}
      />
      <ItemList>{uh}</ItemList>
    </ChatHistoryStyles>
  );
};

export default ChatHistory;
