import styled from 'styled-components';

export const MessageEditorStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 19%;
  padding: 0 10px;
  background-color: black;
`;

export const Input = styled.textarea`
  height: 12vh;
  width: 85%;
  min-height: 12vh;
  max-height: 70vh;
  padding: 10px;
  resize: vertical;
  font-size: 1.3em;
  font-family: inherit;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: #303132;
  color: white;
`;
