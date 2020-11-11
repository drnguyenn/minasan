import styled, { css } from 'styled-components';

const isSelectedStyles = css`
  background-color: #e8e5e5;
`;

export const ChatHistoryItemStyles = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 65px;
  padding: 0 10px;

  &:hover {
    background-color: #e8e5e5;
    cursor: pointer;
  }

  ${({ isSelected }) => isSelected && isSelectedStyles}
`;

export const Title = styled.span`
  padding-left: 15px;
  font-size: 1.4em;
`;
