import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatSearchBar from '../chat-search-bar/chat-search-bar.component';
import ChatHistoryItem from '../chat-history-item/chat-history-item.component';
import Spinner from '../spinner/spinner.component';

import { ChatHistoryStyles, ItemList } from './chat-history.styles';

import { fetchConversationsStart } from '../../redux/chat/chat.actions';

const ChatHistory = () => {
  const dispatch = useDispatch();

  // const partner = useSelector(state => state.chat.currentPartner);
  // const chat_history = useSelector(state => state.chat.chatHistory);
  // const currentUser = useSelector(state => state.user.currentUser);

  // const partnersList = chat_history.map(partner => {
  //   let p = currentUser.id == partner.user1.id ? partner.user2 : partner.user1;
  //   return (
  //     <ChatHistoryItem
  //       key={partner.id}
  //       title={p.name.toString()}
  //       roomId={partner.id}
  //       handleClick={() => setCurrentChatId(p.id)}
  //       isSelected={currentChatId === p.id}
  //     />
  //   );
  // });
  const user = useSelector(state => state.user.currentUser);
  const { chatHistory, isLoading } = useSelector(state => state.chat);

  const [currentChatId, setCurrentChatId] = useState();

  useEffect(() => {
    dispatch(fetchConversationsStart());
  }, [dispatch]);

  useEffect(() => {
    if (chatHistory.length) setCurrentChatId(chatHistory[0].id);
  }, [chatHistory]);
  console.log(chatHistory);
  return (
    <ChatHistoryStyles>
      <ChatSearchBar />
      {/* <ItemList>{partnersList}</ItemList> */}
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
