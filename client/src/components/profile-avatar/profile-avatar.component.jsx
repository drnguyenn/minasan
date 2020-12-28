import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';

import {
  ProfileAvatarContainer,
  ProfileAvatarTitle,
  UserAvatarAndUploadButton,
  UserAvatar,
  FileInput
} from './profile-avatar.styles';

import {
  getCurrentUser,
  updateProfileAvaStart
} from '../../redux/user/user.actions';

const ProfileAvatar = () => {
  const { currentUser } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const updatePicture = data =>
    new Promise((resolve, reject) => {
      dispatch(updateProfileAvaStart(data));
      resolve();
    });

  const handleUploadClick = async event => {
    const file = event.target.files[0];

    let data = new FormData();
    data.append('avatar', file);

    updatePicture(data).finally(() => {
      dispatch(getCurrentUser());
    });
  };

  return (
    <ProfileAvatarContainer>
      <ProfileAvatarTitle>Avatar</ProfileAvatarTitle>
      <UserAvatarAndUploadButton>
        <UserAvatar
          style={{ backgroundImage: `url(${currentUser.avatarUrl})` }}
        ></UserAvatar>
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
    </ProfileAvatarContainer>
  );
};

export default ProfileAvatar;
