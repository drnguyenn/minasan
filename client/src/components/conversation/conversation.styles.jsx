import styled from 'styled-components';

export const ConversationStyles = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
  background-color: black;
  overflow-y: auto;
`;

export const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  padding: 0 10px;
  margin-top: auto;
  margin-bottom: 30px;
`;

export const IntroTitle = styled.span`
  font-size: xx-large;
  font-weight: bold;
`;

export const IntroDescription = styled.span``;

export const MessageStatus = styled.span`
  align-self: flex-end;
  margin: 0 10px;
`;
