import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatSearchBar from '../chat-search-bar/chat-search-bar.component';
import ChatHistoryItem from '../chat-history-item/chat-history-item.component';
import Spinner from '../spinner/spinner.component';

import { ChatHistoryStyles, ItemList } from './chat-history.styles';

import { fetchConversationsStart } from '../../redux/chat/chat.actions';

const ChatHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const { connectedUser, currentPartner, isLoading } = useSelector(
    state => state.chat
  );

  // const [currentChatId, setCurrentChatId] = useState();

  useEffect(() => {
    dispatch(fetchConversationsStart());
  }, [dispatch]);

  // useEffect(() => {
  //   if (connectedUser.length) setCurrentChatId(connectedUser[0].id);
  // }, [connectedUser]);

  return (
    <ChatHistoryStyles>
      <ChatSearchBar />
      {isLoading ? (
        <Spinner />
      ) : (
        <ItemList>
          {connectedUser.map(connectedSingleUser => {
            const partner =
              user.id === connectedSingleUser.user1.id
                ? connectedSingleUser.user2
                : connectedSingleUser.user1;
            return (
              <ChatHistoryItem
                key={connectedSingleUser.id}
                title={partner.name}
                roomId={connectedSingleUser.id}
                isSelected={currentPartner.id === partner.id}
              />
            );
          })}
        </ItemList>
      )}
    </ChatHistoryStyles>
  );
};

export default ChatHistory;
