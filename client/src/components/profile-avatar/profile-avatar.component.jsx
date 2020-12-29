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
  const [snackBar, setSnackBar] = useState({ open: false, message: '' });

  const [uploadTriggered, setUploadTriggered] = useState(false);

  const { currentUser, isAvatarUploading, error } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (uploadTriggered && isAvatarUploading)
      setSnackBar({
        open: true,
        message: 'Uploading...'
      });

    if (uploadTriggered && !isAvatarUploading && !error) {
      setSnackBar({
        open: true,
        message: 'Avatar uploaded'
      });
      setUploadTriggered(uploadTriggered => false);
    }

    if (uploadTriggered && error) {
      setSnackBar({
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
        setSnackBar({
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

    setSnackBar({
      ...snackBar,
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
