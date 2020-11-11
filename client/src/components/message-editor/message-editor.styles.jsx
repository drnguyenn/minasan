import styled from 'styled-components';

export const MessageEditorStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

export const Input = styled.textarea`
  height: 12vh;
  width: 85%;
  min-height: 12vh;
  max-height: 70vh;
  resize: vertical;
  font-size: 1.3em;
  font-family: inherit;
  border-radius: 10px;
  outline: none;
  background-color: #303132;
  color: white;
`;
