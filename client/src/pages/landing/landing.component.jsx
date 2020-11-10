import React from 'react';

import SignInAndSignUp from '../../components/sign-in-and-sign-up/sign-in-and-sign-up.component';

import LandingImage from '../../assets/images/landing-page.jpg';

import {
  LandingPageStyles,
  LandingImageContainer,
  SignInAndSignUpForm
} from './landing.styles';

const LandingPage = () => (
  <LandingPageStyles>
    <LandingImageContainer src={LandingImage} alt='Landing Image' />
    <SignInAndSignUpForm>
      <h1>Minasan</h1>
      <SignInAndSignUp />
    </SignInAndSignUpForm>
  </LandingPageStyles>
);

export default LandingPage;
