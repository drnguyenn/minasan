import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Chip, TextField, Fab, Tooltip } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import {
  toggleHobbiesModalOpened,
  toggleIssuesModalOpened
} from '../../redux/modal/modal.actions';

import { updateProfileStart } from '../../redux/profile/profile.action';

import {
  ProfileInputFormContainer,
  ProfileInputFormTitle,
  HobbiesSecton,
  HobbyList,
  ButtonsGroupContainer
} from './profile-input-form.styles';

const ProfileInputForm = () => {
  const { currentUser } = useSelector(state => state.user);
  const { hobbies, issues } = currentUser;

  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState(currentUser);

  const { username, email } = userInfo;

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(
      updateProfileStart({
        name: event.target.username.value,
        password: event.target.password.value
      })
    );

    setUserInfo({
      ...userInfo,
      username: currentUser.name
    });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <ProfileInputFormContainer>
      <ProfileInputFormTitle>Profile</ProfileInputFormTitle>
      <form onSubmit={handleSubmit}>
        <TextField
          name='email'
          type='text'
          defaultValue={email}
          label='Email'
          margin='normal'
          variant='outlined'
          disabled
          fullWidth
        />
        <TextField
          required
          autoComplete='off'
          name='username'
          type='text'
          defaultValue={username}
          onChange={handleChange}
          label='Username'
          margin='normal'
          variant='outlined'
          fullWidth
        />
        <TextField
          required
          name='password'
          type='password'
          defaultValue=''
          onChange={handleChange}
          label='Password'
          margin='normal'
          variant='outlined'
          fullWidth
        />
        <h3>Hobbies</h3>
        <HobbiesSecton>
          <HobbyList>
            {hobbies.length
              ? hobbies.map(hobby => (
                  <Chip
                    label={hobby.name
                      .toLowerCase()
                      .split(' ')
                      .map(
                        word => word.charAt(0).toUpperCase() + word.substring(1)
                      )
                      .join(' ')}
                    color='secondary'
                    style={{ margin: '0 10px 10px 0' }}
                  />
                ))
              : 'Nothing'}
          </HobbyList>
          <Tooltip title='Edit'>
            <Fab onClick={() => dispatch(toggleHobbiesModalOpened())}>
              <Edit />
            </Fab>
          </Tooltip>
        </HobbiesSecton>
        <h3>Issues</h3>
        <HobbiesSecton>
          <HobbyList>
            {issues.length
              ? issues.map(issue => (
                  <Chip
                    label={issue.name
                      .toLowerCase()
                      .split(' ')
                      .map(
                        word => word.charAt(0).toUpperCase() + word.substring(1)
                      )
                      .join(' ')}
                    color='secondary'
                    style={{ margin: '0 10px 10px 0' }}
                  />
                ))
              : 'Nothing'}
          </HobbyList>
          <Tooltip title='Edit'>
            <Fab onClick={() => dispatch(toggleIssuesModalOpened())}>
              <Edit />
            </Fab>
          </Tooltip>
        </HobbiesSecton>
        <ButtonsGroupContainer>
          <Fab variant='extended' color='primary' type='submit'>
            Save
          </Fab>
        </ButtonsGroupContainer>
      </form>
    </ProfileInputFormContainer>
  );
};

export default ProfileInputForm;
