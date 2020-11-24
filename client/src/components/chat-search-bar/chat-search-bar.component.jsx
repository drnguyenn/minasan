import React from 'react';

import { Search } from '@material-ui/icons';

import {
  ChatSearchBarStyles,
  SearchInput,
  Icon
} from './chat-search-bar.styles';

const ChatSearchBar = () => (
  <ChatSearchBarStyles>
    <SearchInput type='search' placeholder='Search...' autoComplete='off' />
    <Icon>
      <Search />
    </Icon>
  </ChatSearchBarStyles>
);

export default ChatSearchBar;
