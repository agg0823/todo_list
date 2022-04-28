# To do List 만들기

## 프로젝트 준비

터미널 입력
```
yarn create react-app todo-test
```

디렉터리 들어가기
```
cd todo-test
```

필요 프로그램 설치
```
yarn add styled-components react-icons
```

root폴더에 `.prettierrc`파일을 생성
코드 입력
```
{
    "arrowParens": "always",
    "semi": true,
    "singleQuote": true,
    "useTabs": false,
    "trailingComma": "all",
    "tabWidth": 2,
    "printWidth": 80
}
```

root폴더에 `jsconfig.json` 파일을 생성
코드 입력
```
{
    "compilerOptions": {
        "target": "es6",
        "baseUrl": "src"
    },
    "include": ["src"]
}
```

index.css 수정
```
body {
  margin: 0;
  padding: 0;
  background: #e9ecef;
}
```

App.js에 내용 삭제하고 rsc+tab
코드 입력
```
import React from 'react';

const App = () => {
  return (
    <div>
      Todo리스트 만들기 준비 완료!!
    </div>
  );
};

export default App;
```

## 소스 입력
src폴더 내에 `components` 폴더를 생성

`components` 폴더에 컴포넌트 만들기

1. `TodoTemplate.js`
2. `TodoInsert.js`
3. `TodoListItem.js`
4. `TodoList.js`


## 완성 코드

### TodoTemplate.js

```
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
```


### TodoInsert.js

```
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
```


### TodoListItem.js

```
import React from 'react';
import styled from 'styled-components';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;

  return (
    <TodoItemWrapper>
      <CheckBox
        className={cn('checkbox', { checked })}
        onClick={() => onToggle(id)}
      >
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </CheckBox>
      <Remove onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </Remove>
    </TodoItemWrapper>
  );
};


const TodoItemWrapper = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  &:nth-child(even) {
    background: #F9F7FC;
  }
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const CheckBox = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
    color: #69677A;
  }
  .text {
    margin-left: 0.5rem;
    flex: 1;
    color: #69677A;
  }
  &.checked {
    svg {
      color: #8A99D4;
    }
    .text {
      color: #adb5bd;
      text-decoration: line-through;
    }
  }
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #B0A8F3;
  cursor: pointer;
  &:hover {
    color: #A29BE2;
  }
`;

export default TodoListItem;
```


### TodoList.js

```
import React from 'react';
import TodoListItem from 'components/TodoListItem';
import styled from 'styled-components';

const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <TodoListWrapper>
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </TodoListWrapper>
  );
};


const TodoListWrapper = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow: auto;
`;

export default TodoList;
```

### App.js

```
import React, { useRef, useState, useCallback } from 'react';
import TodoTemplate from 'components/TodoTemplate';
import TodoInsert from 'components/TodoInsert';
import TodoList from 'components/TodoList';


const App = () => {
  const [todos, setTodos] = useState([
    {
      id : 1,
      text : '할일1',
      checked : true,
    },
    {
      id : 2,
      text : '할일2',
      checked : true,
    },
    {
      id : 3,
      text : '할일3',
      checked : false,
    }
  ]);

  //고윳값을 가질 id생성
  const nextId = useRef(4);

  //onInsert함수
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id : nextId.current,
        text,
        checked :false
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; 
    }
  );
  
  //항목 지우기
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  //onToggle 체크박스
  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
```
