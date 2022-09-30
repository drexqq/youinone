import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [addMode, setAddMode] = useState<boolean>(false);
  /**
   * @param id number 투두리스트의 체크표시 클릭시 발생
   */
  const onClickChecked = (id: number) => {
    setTodos(
      todos.map((todo): ITodoItem => {
        if (todo.id === id) todo.isChecked = !todo.isChecked;
        return todo;
      }),
    );
  };
  /**
   * @param id number 투두리스트 아이템 삭제
   */
  const deleteItem = (id: number) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id != id;
      }),
    );
  };
  /**
   * @param e  투두리스트 아이템 추가
   */
  const addItem = (e: React.MouseEvent<HTMLElement>) => {
    let item = e.target as HTMLElement;
    if (item.nodeName === 'P') {
      const target = e.target as HTMLElement;
      item = target.parentElement as HTMLElement;
    }
    item.classList.add('add');
    setAddMode(true);
  };

  const getTodoItems = async (): Promise<void> => {
    await axios.get('https://api.youinone.life/todolist').then(({ data }) => {
      setTodos(data.body.Items);
    });
  };

  useEffect(() => {
    getTodoItems();
  }, []);

  return (
    <>
      <ProjectTitle name="ToDoList" />
      <TodoWrap>
        <Flicking
          align={'next'}
          circular={true}
          duration={100}
          style={{ width: '100%', maxHeight: '56px' }}
        >
          <TodoItem onClick={addItem}>
            <p style={{ color: '#ccc' }}>+ 할 일 추가</p>
            <div className="add-input-box">
              <div>
                <IconBox src={TodoYet} alt="todo-yet" />
                <CheckBox className="input-checkbox" type="checkbox" />
              </div>
              <div className="content">
                <input type="text" placeholder="add what todo !" />
              </div>
            </div>
          </TodoItem>
          {addMode ? <DeleteBox src={IconDelete} alt="delete" /> : <></>}
        </Flicking>
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
  justify-content: center;
  .add-input-box {
    display: none;
    align-items: center;
    gap: 0.5rem;
  }
  &.add {
    p {
      display: none;
    }
    .add-input-box {
      display: flex;
      width: 100%;
    }
  }

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
