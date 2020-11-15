import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { signUpStart } from '../../redux/user/user.actions';

import { TextField, Fab } from '@material-ui/core';

import { SignUpStyles } from './sign-up.styles';

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { username, email, password, confirmPassword } = userCredentials;

  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    dispatch(signUpStart({ username, email, password }));

    setUserCredentials({
      ...userCredentials,
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignUpStyles>
      <form onSubmit={handleSubmit}>
        <TextField
          name='username'
          type='text'
          value={username}
          onChange={handleChange}
          label='Username'
          variant='outlined'
          fullWidth
          margin='normal'
          required
        />
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
        <TextField
          name='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
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
          Sign Up
        </Fab>
      </form>
    </SignUpStyles>
  );
};

export default SignUp;
