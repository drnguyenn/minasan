import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Backdrop, CircularProgress } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';

import {
  ProfileAvatarStyles,
  ProfileAvatarTitle,
  UserAvatarAndUploadButton,
  UserAvatar,
  FileInput
} from './profile-avatar.styles';

import { updateProfileAvatarStart } from '../../redux/user/user.actions';

const ProfileAvatar = () => {
  const { currentUser, isAvatarUploading } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleUploadClick = async event => {
    const file = event.target.files[0];

    const data = new FormData();
    data.append('avatar', file);

    dispatch(updateProfileAvatarStart(data));
  };

  return (
    <ProfileAvatarStyles>
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
