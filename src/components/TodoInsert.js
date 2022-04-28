import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    //onSubmit 이벤트 설정
    const onSubmit = useCallback(
        (e) => {
            onInsert(value);
            setValue('');
            e.preventDefault();
        },
        [onInsert, value]
    )

    return (
        <TodoInsertWrapper onSubmit={onSubmit}>
            <input 
            type="text" 
            placeholder='할 일을 입력하세요'
            value={value}
            onChange={onChange}
            />
            <button type="submit"><MdAdd /></button>
        </TodoInsertWrapper>
    );
};

const TodoInsertWrapper = styled.form`
  display: flex;
  background: #E5DBEE;
  input {
    background: none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: #796F83;
    &::placeholder {
      color: #AE9CC1;
    }
    flex: 1;
  }
  button {
    background: #AE9CC1;
    outline: none;
    border: none;
    color: #fff;
    padding: 0 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.1s background ease-in;
    &:hover {
      background: #868296;
    }
  }
`;

export default TodoInsert;