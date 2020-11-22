import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { toggleFindFriendsModalOpened } from '../../redux/modal/modal.actions';

import AvatarDropdown from '../avatar-dropdown/avatar-dropdown.component';

import { Fab } from '@material-ui/core';
import { Group } from '@material-ui/icons';

import { HeaderStyles, AppName, OptionsContainer } from './header.styles';

const Header = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  const history = useHistory();

  const dispatch = useDispatch();

  return (
    <HeaderStyles>
      <AppName onClick={() => history.push('/home')}>Minasan</AppName>

      {currentUser ? (
        <OptionsContainer>
          <Fab
            variant='extended'
            color='primary'
            onClick={() => dispatch(toggleFindFriendsModalOpened())}
          >
            <Group />
            Find Friends
          </Fab>
          <AvatarDropdown />
        </OptionsContainer>
      ) : null}
    </HeaderStyles>
  );
};

export default Header;
