import styled from 'styled-components';

export const ChatBoxStyles = styled.div`
  width: 70%;
  height: 100%;
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  padding: 0 10px;
  background-color: #242526;
`;

export const AvatarAndTitle = styled.div`
  display: flex;
  align-items: center;
  width: 15%;
`;
export const Title = styled.span`
  padding-left: 15px;
  font-size: 1.4em;
  font-weight: bold;
`;
