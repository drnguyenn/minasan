import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  IconButton,
  Backdrop,
  CircularProgress,
  Snackbar
} from '@material-ui/core';
import { PhotoCamera, Close } from '@material-ui/icons';

import {
  ProfileAvatarStyles,
  ProfileAvatarTitle,
  UserAvatarAndUploadButton,
  UserAvatar,
  FileInput
} from './profile-avatar.styles';

import { updateProfileAvatarStart } from '../../redux/user/user.actions';

const ProfileAvatar = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const [uploadTriggered, setUploadTriggered] = useState(false);

  const { currentUser, isAvatarUploading, error } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (uploadTriggered && isAvatarUploading)
      setSnackbar({
        open: true,
        message: 'Uploading...'
      });

    if (uploadTriggered && !isAvatarUploading && !error) {
      setSnackbar({
        open: true,
        message: 'Avatar uploaded'
      });
      setUploadTriggered(uploadTriggered => false);
    }

    if (uploadTriggered && error) {
      setSnackbar({
        open: true,
        message: error
      });
      setUploadTriggered(uploadTriggered => false);
    }
  }, [isAvatarUploading, error, uploadTriggered]);

  const FileTooLargeMessage = () => (
    <p>
      Your image seems to be larger than 2 MB.
      <br />
      That's way too much. Maybe consider reducing it's size ?
    </p>
  );

  const handleUploadClick = async event => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 2097152) {
        setSnackbar({
          open: true,
          message: <FileTooLargeMessage />
        });
        return;
      }
    }

    const data = new FormData();
    data.append('avatar', file);

    dispatch(updateProfileAvatarStart(data));

    setUploadTriggered(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <ProfileAvatarStyles>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbar.message}
        action={
          <IconButton size='small' color='inherit' onClick={handleClose}>
            <Close fontSize='small' />
          </IconButton>
        }
      />
      <ProfileAvatarTitle>Avatar</ProfileAvatarTitle>
      <UserAvatarAndUploadButton>
        <UserAvatar
          style={{ backgroundImage: `url(${currentUser.avatarUrl})` }}
        >
          <Backdrop
            open={isAvatarUploading}
            style={{ position: 'absolute', zIndex: 1 }}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        </UserAvatar>
        <FileInput
          id='upload-button'
          name='avatarUrl'
          type='file'
          accept='image/*'
          onChange={handleUploadClick}
        />
        <label htmlFor='upload-button'>
          <IconButton component='span' color='inherit'>
            <PhotoCamera />
          </IconButton>
        </label>
      </UserAvatarAndUploadButton>
    </ProfileAvatarStyles>
  );
};

export default ProfileAvatar;
