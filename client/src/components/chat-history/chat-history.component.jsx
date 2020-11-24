import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversationsStart } from '../../redux/chat/chat.actions';

import ChatSearchBar from '../chat-search-bar/chat-search-bar.component';
import ChatHistoryItem from '../chat-history-item/chat-history-item.component';
import Spinner from '../spinner/spinner.component';

import { ChatHistoryStyles, ItemList } from './chat-history.styles';

const ChatHistory = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.currentUser);
  const { chatHistory, isLoading } = useSelector(state => state.chat);

  const [currentChatId, setCurrentChatId] = useState();

  useEffect(() => {
    dispatch(fetchConversationsStart());
  }, [dispatch]);

  useEffect(() => {
    if (chatHistory.length) setCurrentChatId(chatHistory[0].id);
  }, [chatHistory]);

  return (
    <ChatHistoryStyles>
      <ChatSearchBar />
      {isLoading ? (
        <Spinner />
      ) : (
        <ItemList>
          <ChatHistoryItem
            title={user.username}
            handleClick={() => setCurrentChatId(user.id)}
            isSelected={currentChatId === user.id}
          />
          {chatHistory.map(chatHistoryItem => (
            <ChatHistoryItem
              key={chatHistoryItem.id}
              title={chatHistoryItem.user2Id.toString()}
              handleClick={() => setCurrentChatId(chatHistoryItem.id)}
              isSelected={currentChatId === chatHistoryItem.id}
            />
          ))}
        </ItemList>
      )}
    </ChatHistoryStyles>
  );
};

export default ChatHistory;
