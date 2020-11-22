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

const FindFriendsModal = () => {
  const { isFindFriendsModalOpened } = useSelector(state => state.modal);

  const dispatch = useDispatch();

  const users = ['user1', 'user2'];

  return (
    <Dialog
      open={isFindFriendsModalOpened}
      onClose={() => dispatch(toggleFindFriendsModalOpened())}
    >
      <DialogTitle>Get new friends</DialogTitle>
      <List>
        {users.map(user => (
          <ListItem key={user} button>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default FindFriendsModal;
