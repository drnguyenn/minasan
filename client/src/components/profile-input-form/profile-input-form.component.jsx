import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Chip,
  TextField,
  Fab,
  Tooltip,
  Backdrop,
  CircularProgress,
  Snackbar,
  IconButton
} from '@material-ui/core';
import { Edit, Close } from '@material-ui/icons';

import {
  toggleHobbiesModalOpened,
  toggleTopicsModalOpened
} from '../../redux/modal/modal.actions';

import { updateProfileStart } from '../../redux/user/user.actions';

import {
  ProfileInputFormStyles,
  ProfileInputFormTitle,
  HobbiesSecton,
  HobbyList,
  ButtonsGroupContainer
} from './profile-input-form.styles';

const ProfileInputForm = () => {
  const { currentUser, isProfileUpdating, error } = useSelector(
    state => state.user
  );

  const [updateTriggered, setUploadTriggered] = useState(false);

  const [snackBar, setSnackBar] = useState({ open: false, message: '' });

  const { hobbies, topics } = currentUser;

  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({ ...currentUser, password: '' });

  const { username, email, password } = userInfo;

  useEffect(() => {
    if (updateTriggered && isProfileUpdating)
      setSnackBar({
        open: true,
        message: 'Updating...'
      });

    if (updateTriggered && !isProfileUpdating && !error) {
      setSnackBar({
        open: true,
        message: 'Changes saved'
      });
      setUploadTriggered(updateTriggered => false);
    }

    if (updateTriggered && error) {
      setSnackBar({
        open: true,
        message: error
      });
      setUploadTriggered(updateTriggered => false);
    }
  }, [isProfileUpdating, error, updateTriggered]);

  const handleSubmit = async event => {
    event.preventDefault();

    const newUserInfo = { name: username };

    dispatch(
      updateProfileStart(
        password.length
          ? {
              ...newUserInfo,
              password
            }
          : newUserInfo
      )
    );

    setUploadTriggered(true);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    setSnackBar({
      ...snackBar,
      open: false
    });
  };

  return (
    <ProfileInputFormStyles>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackBar.message}
        action={
          <React.Fragment>
            <IconButton size='small' color='inherit' onClick={handleClose}>
              <Close fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
      <ProfileInputFormTitle>Profile</ProfileInputFormTitle>
      <form onSubmit={handleSubmit}>
        <Backdrop
          open={isProfileUpdating}
          style={{ position: 'absolute', zIndex: 1 }}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
        <TextField
          name='email'
          type='text'
          value={email}
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
          value={username}
          onChange={handleChange}
          label='Username'
          margin='normal'
          variant='outlined'
          fullWidth
        />
        <TextField
          name='password'
          type='password'
          defaultValue=''
          onChange={handleChange}
          label='New password'
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
                    key={hobby.id}
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
        <h3>Favorite Topics</h3>
        <HobbiesSecton>
          <HobbyList>
            {topics.length
              ? topics.map(topic => (
                  <Chip
                    key={topic.id}
                    label={topic.name
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
            <Fab onClick={() => dispatch(toggleTopicsModalOpened())}>
              <Edit />
            </Fab>
          </Tooltip>
        </HobbiesSecton>
        <ButtonsGroupContainer>
          <Fab
            variant='extended'
            color='primary'
            type='submit'
            disabled={isProfileUpdating}
          >
            Save
          </Fab>
        </ButtonsGroupContainer>
      </form>
    </ProfileInputFormStyles>
  );
};

export default ProfileInputForm;
