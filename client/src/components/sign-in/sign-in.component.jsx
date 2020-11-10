import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { emailSignInStart } from '../../redux/user/user.actions';

import { TextField, Fab } from '@material-ui/core';

import { SignInStyles } from './sign-in.styles';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  });

  const { email, password } = userCredentials;

  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(emailSignInStart(email, password));

    setUserCredentials({ ...userCredentials, email: '', password: '' });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignInStyles>
      <form onSubmit={handleSubmit}>
        <TextField
          name='email'
          type='email'
          value={email}
          onChange={handleChange}
          label='Email'
          variant='outlined'
          fullWidth
          margin='normal'
          required
        />
        <TextField
          name='password'
          type='password'
          value={password}
          onChange={handleChange}
          label='Password'
          variant='outlined'
          fullWidth
          margin='normal'
          required
        />
        <Fab
          variant='extended'
          color='primary'
          type='submit'
          style={{ margin: '12px 0' }}
        >
          Sign In
        </Fab>
      </form>
    </SignInStyles>
  );
};

export default SignIn;
