import React, { useState } from 'react';
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

  const [userInfo, setUserInfo] = useState(currentUser);

  const { username, firstName, lastName, phoneNumber, gender, age } = userInfo;

  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();

    setUserInfo({
      ...userInfo,
      username: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: '',
      age: 0
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
          value={username}
          onChange={handleChange}
          label='Username'
          margin='normal'
          fullWidth
        />
        <h3>Hobbies</h3>
        <HobbiesSecton>
          <HobbyList>
            <Chip
              label='Book'
              color='secondary'
              style={{ margin: '0 10px 10px 0' }}
            />
            <Chip
              label='Music'
              color='secondary'
              style={{ margin: '0 10px 10px 0' }}
            />
            <Chip
              label='Travel'
              color='secondary'
              style={{ margin: '0 10px 10px 0' }}
            />
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
            <Chip
              label='Family'
              color='secondary'
              style={{ margin: '0 10px 10px 0' }}
            />
            <Chip
              label='Work'
              color='secondary'
              style={{ margin: '0 10px 10px 0' }}
            />
          </HobbyList>
          <Tooltip title='Edit'>
            <Fab onClick={() => dispatch(toggleIssuesModalOpened())}>
              <Edit />
            </Fab>
          </Tooltip>
        </HobbiesSecton>
        <ButtonsGroupContainer>
          <Fab variant='extended' color='primary'>
            Save
          </Fab>
        </ButtonsGroupContainer>
      </form>
    </ProfileInputFormContainer>
  );
};

export default ProfileInputForm;
