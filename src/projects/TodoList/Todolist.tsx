import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectTitle from '../../components/ProjectTitle';
import IconDelete from '../../assets/todolist/delete.svg';
import TodoYet from '../../assets/todolist/todo-yet.svg';
import TodoDone from '../../assets/todolist/todo-done.svg';

import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';

interface ITodoItem {
  id: number;
  content: string;
  isChecked: boolean;
}

function TodoList() {
  const dummyTodos = [
    { id: 1, content: 'test1', isChecked: false },
    { id: 2, content: 'test2', isChecked: false },
    { id: 3, content: 'test3', isChecked: true },
    { id: 4, content: 'test4', isChecked: false },
    { id: 5, content: 'test5', isChecked: true },
    { id: 6, content: 'test6', isChecked: false },
    { id: 7, content: 'test7', isChecked: false },
    { id: 8, content: 'test8', isChecked: false },
    { id: 9, content: 'test9', isChecked: false },
    { id: 10, content: 'test10', isChecked: false },
    { id: 11, content: 'test11', isChecked: false },
    { id: 12, content: 'test12', isChecked: false },
    { id: 13, content: 'test13', isChecked: false },
    { id: 14, content: 'test14', isChecked: false },
  ];
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  /**
   * @param id number 투두리스트의 체크표시 클릭시 발생 @param0
   */
  const onClickChecked = (id: number) => {
    setTodos(
      todos.map((todo): ITodoItem => {
        if (todo.id === id) todo.isChecked = !todo.isChecked;
        return todo;
      }),
    );
  };

  const deleteItem = (id: number) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id != id;
      }),
    );
  };

  useEffect(() => {
    setTodos(dummyTodos);
  }, []);

  return (
    <>
      <ProjectTitle name="ToDoList" />
      <TodoWrap>
        {todos.map(({ id, content, isChecked }: ITodoItem) => {
          return (
            <li key={id} style={{ width: '100%', height: '56px' }}>
              <Flicking
                align={'next'}
                circular={true}
                duration={100}
                style={{ width: '100%', maxHeight: '56px' }}
              >
                <TodoItem>
                  <div onClick={() => onClickChecked(id)}>
                    <IconBox
                      src={isChecked ? TodoDone : TodoYet}
                      alt="todo-yet"
                    />
                    <CheckBox
                      className="input-checkbox"
                      type="checkbox"
                      defaultChecked={isChecked}
                    />
                  </div>
                  <div className="content">
                    <input
                      type="text"
                      defaultValue={content}
                      readOnly={isChecked ? true : false}
                    />
                  </div>
                </TodoItem>
                <DeleteBox
                  src={IconDelete}
                  alt="delete"
                  onClick={() => {
                    deleteItem(id);
                  }}
                />
              </Flicking>
            </li>
          );
        })}
      </TodoWrap>
    </>
  );
}

const TodoWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: 1.25rem;
  gap: 0.625rem 0;
  height: calc(100% - 60px);
  overflow: scroll;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const TodoItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  padding: 1rem;
  gap: 0.5rem;
  border-radius: 10px;
  border: 1px solid #eee;
  .content {
    width: calc(100% - 1.25rem);
    height: 100%;
    input {
      width: 100%;
      height: 100%;
      border: 0;
      ${({ theme }) => theme.font.TODO_ITEM};
    }
  }
`;
const IconBox = styled.img`
  width: 1.5rem;
  height: auto;
`;
const CheckBox = styled.input`
  display: none;
`;
const DeleteBox = styled.img`
  width: 56px;
  margin-left: 10px;
  height: auto;
  max-height: 56px;
  background-color: #ff8181;
  border-radius: 10px;
`;

export default TodoList;
