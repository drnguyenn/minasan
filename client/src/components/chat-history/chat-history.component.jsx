import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatSearchBar from '../chat-search-bar/chat-search-bar.component';
import ChatHistoryItem from '../chat-history-item/chat-history-item.component';
import Spinner from '../spinner/spinner.component';

import { ChatHistoryStyles, ItemList } from './chat-history.styles';

import { fetchConversationsStart } from '../../redux/chat/chat.actions';

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
          {chatHistory.map(chatHistoryItem => {
            const partner =
              user.id === chatHistoryItem.user1.id
                ? chatHistoryItem.user2
                : chatHistoryItem.user1;
            return (
              <ChatHistoryItem
                key={chatHistoryItem.id}
                title={partner.name}
                roomId={currentChatId}
                handleClick={() => setCurrentChatId(chatHistoryItem.id)}
                isSelected={currentChatId === chatHistoryItem.id}
              />
            );
          })}
        </ItemList>
      )}
    </ChatHistoryStyles>
  );
};

export default ChatHistory;
