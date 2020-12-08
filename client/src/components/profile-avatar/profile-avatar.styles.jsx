import styled from 'styled-components';

export const ProfileAvatarContainer = styled.div`
  width: 22%;
  height: 30vw;
  display: flex;
  flex-direction: column;
`;

export const ProfileAvatarTitle = styled.h2`
  margin: 10px 0;
`;

export const UserAvatarAndUploadButton = styled.div`
  height: inherit;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: solid gray 1px;
  border-bottom: solid gray 1px;
`;

export const UserAvatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-size: cover;
  background-position: center;
  background-image: ${({ avatarUrl }) => `url(${avatarUrl})`};
`;

export const FileInput = styled.input`
  display: none;
`;
