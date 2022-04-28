import React from 'react';
import styled from 'styled-components';

const TodoTemplate = ({ children }) => {
  return (
    <TodoWrapper>
      <AppTile>Todo List</AppTile>
      <Content>{children}</Content>
    </TodoWrapper>
  );
};
const TodoWrapper = styled.div`
  width: 512px;
  margin: 6rem auto 0;
  border-radius: 20px;
  overflow: hidden;
`;

const AppTile = styled.div`
  background: #B7C4EF;
  color: #fff;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: #ffffff;
`;

export default TodoTemplate;