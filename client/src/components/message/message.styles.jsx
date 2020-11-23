import styled, { css } from 'styled-components';

const MyMessageStyles = css`
  color: black;
  background-color: lightgrey;
`;

const OthersMessageStyles = css`
  color: white;
  background-color: #707bc4;
`;

export const MessageStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 10px;
  align-items: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'unset')};
`;

export const Sender = styled.span`
  font-weight: bolder;
`;

export const Content = styled.div`
  width: max-content;
  max-width: 60%;
  padding: 10px;
  white-space: break-spaces;
  overflow-wrap: anywhere;
  border-radius: 10px;

  ${({ isMyMessage }) => (isMyMessage ? MyMessageStyles : OthersMessageStyles)}
`;
