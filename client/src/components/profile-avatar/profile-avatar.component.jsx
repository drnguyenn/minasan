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

import { updateProfileAvaStart } from '../../redux/profile/profile.action';
import { getCurrentUser } from '../../redux/user/user.actions';

const ProfileAvatar = () => {
  const { currentUser } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleUploadClick = async event => {
    const file = event.target.files[0];

    const hobbyIds = currentUser.hobbies.map(hobby => hobby.id);
    const topicIds = currentUser.issues.map(issue => issue.id);

    let data = new FormData();
    data.append('name', currentUser.username);
    data.append('topicIds', topicIds);
    data.append('hobbyIds', hobbyIds);
    data.append('avatar', file);

    dispatch(getCurrentUser());
    dispatch(updateProfileAvaStart(data));
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
