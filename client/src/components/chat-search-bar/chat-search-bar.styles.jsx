import styled from 'styled-components';

export const ChatSearchBarStyles = styled.div`
  width: 100%;
  height: 65px;
  position: sticky;
  top: 65px;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242526;
`;

export const SearchInput = styled.input`
  width: 92%;
  height: 70%;
  border-radius: 23px;
  padding: 12px 12px 12px 50px;
  font-family: inherit;
  font-size: 1.2em;
  border: none;
  outline: none;
`;

export const Icon = styled.span`
  position: absolute;
  left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
