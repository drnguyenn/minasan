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
import { createConversation } from '../../redux/chat/chat.actions';

const FindFriendsModal = () => {
  const { isFindFriendsModalOpened } = useSelector(state => state.modal);

  const dispatch = useDispatch();
  const current_user = useSelector(state => state.user.currentUser);
  const users = useSelector(state => state.chat.suggestedUser);

  const click_event = user_id => {
    dispatch(toggleFindFriendsModalOpened());
    dispatch(createConversation(current_user.id, user_id));
  };

  return (
    <Dialog
      open={isFindFriendsModalOpened}
      onClose={() => dispatch(toggleFindFriendsModalOpened())}
    >
      <DialogTitle>Get new friends</DialogTitle>
      <List>
        {users.map(user => (
          <ListItem key={user.id} onClick={() => click_event(user.id)} button>
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
