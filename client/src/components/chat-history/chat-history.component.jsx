import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatSearchBar from '../chat-search-bar/chat-search-bar.component';
import ChatHistoryItem from '../chat-history-item/chat-history-item.component';
import Spinner from '../spinner/spinner.component';

import { ChatHistoryStyles, ItemList } from './chat-history.styles';

import { fetchConversationsStart } from '../../redux/chat/chat.actions';

const ChatHistory = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(state => state.user);

  const { connectedUser, currentPartner, isLoading } = useSelector(
    state => state.chat
  );

  const [searchField, setSearchField] = useState('');

  const handleChange = event => setSearchField(event.target.value);

  useEffect(() => {
    dispatch(fetchConversationsStart(currentUser.id));
  }, [dispatch, currentUser]);

  return (
    <ChatHistoryStyles>
      <ChatSearchBar onChange={handleChange} />
      {isLoading ? (
        <Spinner />
      ) : (
        <ItemList>
          {connectedUser
            .filter(user => {
              const partner =
                currentUser.id === user.user1.id ? user.user2 : user.user1;

              return partner.name
                .toLowerCase()
                .includes(searchField.toLowerCase());
            })
            .map(connectedSingleUser => {
              const partner =
                currentUser.id === connectedSingleUser.user1.id
                  ? connectedSingleUser.user2
                  : connectedSingleUser.user1;

              const indicator = currentPartner ? currentPartner.id : -1;

              return (
                <ChatHistoryItem
                  key={connectedSingleUser.id}
                  title={partner.name}
                  roomId={connectedSingleUser.id}
                  isSelected={indicator === partner.id}
                  avatarUrl={partner.avatarUrl}
                  receiverId={partner.id}
                />
              );
            })}
        </ItemList>
      )}
    </ChatHistoryStyles>
  );
};

export default ChatHistory;
