import React from 'react';
import { useSelector } from 'react-redux';

import { HomePageStyles } from './homepage.styles';

const HomePage = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  return currentUser ? <HomePageStyles>Home Page</HomePageStyles> : null;
};

export default HomePage;
