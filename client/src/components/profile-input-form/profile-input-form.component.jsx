import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fab,
  Tooltip
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import {
  toggleHobbiesModalOpened,
  toggleIssuesModalOpened
} from '../../redux/modal/modal.actions';

import { updateProfileStart } from '../../redux/profile/profile.action';

import {
  ProfileInputFormContainer,
  ProfileInputFormTitle,
  FirstNameAndLastNameInput,
  AgeAndGenderInput,
  HobbiesSecton,
  HobbyList,
  ButtonsGroupContainer
} from './profile-input-form.styles';

const ProfileInputForm = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState(currentUser);

  const { username, email, hobbies, issues } = userInfo;

  const handleSubmit = async event => {
    event.preventDefault();

    const hobbyIds = hobbies.map(hobby => hobby.id);
    const topicIds = issues.map(issue => issue.id);

    dispatch(
      updateProfileStart({
        username: event.target.username.value,
        // email: event.target.email.value
        password: event.target.password.value,
        topicIds: topicIds,
        hobbyIds: hobbyIds
      })
    );

    setUserInfo({
      ...userInfo,
      username: currentUser.name,
      // email: currentUser.email,
      hobbies: currentUser.hobbies,
      issues: currentUser.issues
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
          required
          name='username'
          type='text'
          defaultValue={username}
          onChange={handleChange}
          label='Username'
          margin='normal'
          fullWidth
        />
        {/* <TextField
          required
          name='email'
          type='text'
          defaultValue={email}
          onChange={handleChange}
          label='Email'
          margin='normal'
          fullWidth
        /> */}
        <TextField
          required
          name='password'
          type='password'
          defaultValue=''
          onChange={handleChange}
          label='Password'
          margin='normal'
          fullWidth
        />
        <h3>Hobbies</h3>
        <HobbiesSecton>
          <HobbyList>
            {currentUser.hobbies.map(hobby => {
              return (
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
              );
            })}
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
            {currentUser.issues.map(issue => {
              return (
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
              );
            })}
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
