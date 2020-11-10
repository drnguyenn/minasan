import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AvatarDropdown from '../avatar-dropdown/avatar-dropdown.component';

import { IconButton } from '@material-ui/core';
import { Assessment } from '@material-ui/icons';

import { HeaderStyles, AppName, OptionsContainer } from './header.styles';

const Header = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  const history = useHistory();

  return (
    <HeaderStyles>
      <AppName onClick={() => history.push('/home')}>Minasan</AppName>
      <OptionsContainer>
        {currentUser ? (
          currentUser.isAdmin ? (
            <IconButton>
              <Assessment style={{ fontSize: 27 }} />
            </IconButton>
          ) : null
        ) : null}
        {currentUser ? <AvatarDropdown /> : null}
      </OptionsContainer>
    </HeaderStyles>
  );
};

export default Header;
