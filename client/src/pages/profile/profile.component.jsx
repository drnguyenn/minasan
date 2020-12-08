import React from 'react';

import ProfileInputForm from '../../components/profile-input-form/profile-input-form.component';
import ProfileAvatar from '../../components/profile-avatar/profile-avatar.component';

import { ProfilePageContainer } from './profile.styles';

const ProfilePage = () => (
  <ProfilePageContainer>
    <ProfileInputForm />
    <ProfileAvatar />
  </ProfilePageContainer>
);

export default ProfilePage;
