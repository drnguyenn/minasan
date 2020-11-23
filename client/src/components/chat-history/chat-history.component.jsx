import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchConversationsStart } from '../../redux/chat/chat.actions'

import ChatHistoryItem from '../chat-history-item/chat-history-item.component';
import { UserSent } from '../chat-view/chat-view.styles';

import { ChatHistoryStyles } from './chat-history.styles';

const ChatHistory = () => {
  const dispatch = useDispatch();

  const user = useSelector( state => state.user.currentUser)

  const [currentChatId, setCurrentChatId] = useState(user.name);

  dispatch(fetchConversationsStart())

  const chat_history = UserSelector(state => state.chat.chatHistory)
  console.log(chat_history)
  // user_history.forEach((h)=>{
  //   return (
  //     <ChatHistoryStyles>
  //       <ChatHistoryItem
  //         title={h.username}
  //         handleClick={() => setCurrentChatId(h.id)}
  //         isSelected={currentChatId === h.id}
  //       />
  //     </ChatHistoryStyles>
  //   )
  // })

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
