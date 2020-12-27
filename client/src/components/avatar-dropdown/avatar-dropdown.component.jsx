import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { signOutStart } from '../../redux/user/user.actions';

import { Menu, MenuItem, IconButton, Avatar } from '@material-ui/core';

const AvatarDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const currentUser = useSelector(state => state.user.currentUser);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleMenu} color='inherit' size='small'>
        {currentUser ? (
          <Avatar alt={currentUser.username} src={currentUser.avatarUrl} />
        ) : null}
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            history.push('/profile');
            handleClose();
          }}
        >
          {currentUser.username}
        </MenuItem>
        <MenuItem onClick={() => dispatch(signOutStart())}>Sign out</MenuItem>
      </Menu>
    </div>
  );
};

export default AvatarDropdown;
