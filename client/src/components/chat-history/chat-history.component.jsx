import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchConversationsStart } from '../../redux/chat/chat.actions'

import ChatHistoryItem from '../chat-history-item/chat-history-item.component';

import { ChatHistoryStyles } from './chat-history.styles';

const ChatHistory = () => {
  const [currentChatId, setCurrentChatId] = useState('long.nd');
  const dispatch = useDispatch();

  const user = useSelector( state => state.user.currentUser)
  dispatch(fetchConversationsStart())

  const user_history = []

  user_history.forEach((h)=>{
    return (
      <ChatHistoryStyles>
        <ChatHistoryItem
          title={h.username}
          handleClick={() => setCurrentChatId(h.id)}
          isSelected={currentChatId === h.id}
        />
      </ChatHistoryStyles>
    )
  })

  return (
    <ChatHistoryStyles>
      <ChatHistoryItem
        title={user.username}
        handleClick={() => setCurrentChatId(user.id)}
        isSelected={currentChatId === user.id}
      />
    </ChatHistoryStyles>
  );
};

export default ChatHistory;
