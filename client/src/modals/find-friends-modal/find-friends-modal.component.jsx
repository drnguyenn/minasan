import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';

import { Person } from '@material-ui/icons';

import { toggleFindFriendsModalOpened } from '../../redux/modal/modal.actions';
import { createConversationStart } from '../../redux/chat/chat.actions';

const FindFriendsModal = () => {
  const { isFindFriendsModalOpened } = useSelector(state => state.modal);

  const dispatch = useDispatch();
  const users = useSelector(state => state.chat.suggestedUser);

  const clickEvent = partnerId => {
    dispatch(toggleFindFriendsModalOpened());
    dispatch(createConversation(partnerId));
    // dispatch(createConversationStart(current_user.id, user_id));
  };

  return (
    <Dialog
      open={isFindFriendsModalOpened}
      onClose={() => dispatch(toggleFindFriendsModalOpened())}
    >
      <DialogTitle>Get new friends</DialogTitle>
      <List>
        {users.map(user => (
          <ListItem key={user.id} onClick={() => clickEvent(user.id)} button>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default FindFriendsModal;
