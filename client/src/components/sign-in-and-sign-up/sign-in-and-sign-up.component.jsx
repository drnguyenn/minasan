import React, { useState } from 'react';

import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';

import {
  SignInAndSignUpStyles,
  SignInAndSignUpSwitch
} from './sign-in-and-sign-up.styles';

const SignInAndSignUp = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <SignInAndSignUpStyles>
      {showSignIn ? <SignIn /> : <SignUp />}
      {showSignIn ? (
        <p>
          Do not have an account yet ?{' '}
          <SignInAndSignUpSwitch onClick={() => setShowSignIn(!showSignIn)}>
            Sign up
          </SignInAndSignUpSwitch>{' '}
          for free now
        </p>
      ) : (
        <p>
          Already have an account ?{' '}
          <SignInAndSignUpSwitch onClick={() => setShowSignIn(!showSignIn)}>
            Sign in
          </SignInAndSignUpSwitch>
        </p>
      )}
    </SignInAndSignUpStyles>
  );
};

export default SignInAndSignUp;
