import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import ProjectTitle from '../../components/ProjectTitle';
import IconDelete from '../../assets/todolist/delete.svg';
import IconAdd from '../../assets/todolist/add.svg';
import TodoYet from '../../assets/todolist/todo-yet.svg';
import TodoDone from '../../assets/todolist/todo-done.svg';
import ArrowDown from '../../assets/icons/arrow-down-grey.svg';

import { FOOTER_HEIGHT } from '../../consts/DesignConst';

import AutoHeightTextArea from '../../components/AutoHeightTextArea';

import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ITodoItem {
  ID: number;
  userID: number;
  content: string;
  isChecked: boolean;
  date: string;
}

interface IAddTodoItem {
  userID: number;
  content: string;
}

function TodoList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [addMode, setAddMode] = useState<boolean>(false);
  const [addContent, setAddContent] = useState<string>('');

  const addFlickRef = useRef<Flicking>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  /**
   * @param {number} ID 투두리스트의 ID
   * @description 투두리스트의 체크표시 클릭
   */
  const onClickChecked = (ID: number) => {
    setTodos(
      todos.map((todo): ITodoItem => {
        if (todo.ID === ID) todo.isChecked = !todo.isChecked;
        return todo;
      }),
    );
  };
  /**
   * @param {string} content 투두리스트의 내용
   * @description 투두리스트의 아이템 추가
   */
  const addItem = async ({ userID, content }: IAddTodoItem): Promise<void> => {
    await axios
      .post('https://api.youinone.life/todolist', { userID, content })
      .then(() => {
        setAddMode(false);
        setAddContent('');
        if (textRef.current) {
          textRef.current.value = '';
        }
        getTodoItems();
      })
      .catch((e) => {
        alert(`Create Error ! ${e}`);
      })
      .finally();
  };
  /**
   * @param {number} ID 투두리스트의 ID
   * @description 투두리스트 아이템 삭제
   */
  const deleteItem = async (ID: number): Promise<void> => {
    await axios
      .delete(`https://api.youinone.life/todolist/${ID}`)
      .then(() => {
        setTodos(
          todos.filter((todo) => {
            return todo.ID != ID;
          }),
        );
        alert('Delete Success !');
      })
      .catch((e) => {
        alert(`Delete Error ! ${e}`);
      });
  };
  /**
   * @param {string} value 투두리스트의 수정할 내용
   * @description 투두리스트의 내용 수정하기
   */
  const setItem = (ID: number, value: string) => {
    setTodos(
      todos.filter((todo) => {
        if (todo.ID === ID) {
          todo.content = value;
        }
        return todo;
      }),
    );
  };
  /**
   * @description 투두리스트 추가 버튼 상태 관리
   */
  const initAddItemBtn = () => {
    if (addFlickRef.current) {
      addFlickRef.current.prev();
    }
    if (textRef.current) {
      textRef.current.value = '';
    }
    setAddContent('');
    setAddMode(false);
  };
  /**
   * @description 투두리스트 아이템 받아오기
   */
  const getTodoItems = async (): Promise<void> => {
    await axios.get('https://api.youinone.life/todolist').then(({ data }) => {
      setTodos(data.body);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getTodoItems();
  }, []);
  return (
    <>
      <ProjectTitle name="ToDoList" />
      <Month>
        <span>10월</span>
        <button>
          <img src={ArrowDown} alt="arrow-down" />
        </button>
      </Month>
      <DayWrap>
        {Array(30)
          .fill(0)
          .map((_, i) => {
            return (
              <Day key={i} className={i == 0 ? 'active' : ''}>
                {i + 1}
              </Day>
            );
          })}
      </DayWrap>
      <TodoWrap>
        <Flicking
          ref={addFlickRef}
          align="center"
          noPanelStyleOverride={false}
          bound={true}
          circular={false}
          moveType="strict"
          duration={100}
          useResizeObserver={true}
          style={{ width: '100%' }}
        >
          {addMode && (
            <AddBox
              src={IconAdd}
              onClick={() => addItem({ userID: 0, content: addContent })}
              alt="add"
            />
          )}
          <TodoItem
            onClick={() => setAddMode(true)}
            className={addMode ? 'add' : ''}
          >
            <p
              style={{
                color: '#ccc',
                textAlign: 'center',
                fontSize: '20px',
                lineHeight: '1rem',
              }}
            >
              +
            </p>
            <div className="add-input-box">
              <IconBox src={TodoYet} alt="todo-yet" />
              <CheckBox className="input-checkbox" type="checkbox" />
              <div className="content">
                <AutoHeightTextArea
                  ref={textRef}
                  ID={-1}
                  value={addContent}
                  setItem={setItem}
                  setAddContent={setAddContent}
                />
              </div>
            </div>
          </TodoItem>
          {addMode && (
            <DeleteBox src={IconDelete} onClick={initAddItemBtn} alt="delete" />
          )}
        </Flicking>

        {!isLoading
          ? todos.map(({ ID, content, isChecked }: ITodoItem) => {
              return (
                <li key={ID} style={{ width: '100%', height: '48px' }}>
                  <Flicking
                    align="center"
                    noPanelStyleOverride={false}
                    bound={true}
                    circular={false}
                    moveType="strict"
                    duration={100}
                    useResizeObserver={true}
                    style={{ width: '100%', maxHeight: '48px' }}
                  >
                    <TodoItem>
                      <div onClick={() => onClickChecked(ID)}>
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
                        {isChecked ? (
                          content
                        ) : (
                          <AutoHeightTextArea
                            ref={null}
                            ID={ID}
                            value={content}
                            setItem={setItem}
                            setAddContent={() => {
                              /**/
                            }}
                          />
                        )}
                      </div>
                    </TodoItem>
                    <DeleteBox
                      src={IconDelete}
                      alt="delete"
                      onClick={() => {
                        deleteItem(ID);
                      }}
                    />
                  </Flicking>
                </li>
              );
            })
          : Array(3) // For Skeleton UI
              .fill(0)
              .map((_, i) => {
                return (
                  <TodoItem key={i}>
                    <Skeleton width={16} height={16} circle={true}></Skeleton>
                    <div className="content">
                      <Skeleton
                        style={{ display: 'block', height: '100%' }}
                      ></Skeleton>
                    </div>
                  </TodoItem>
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
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  gap: 0.625rem 0;
  height: calc(100% - ${FOOTER_HEIGHT}px - 1.25rem);
  overflow: scroll;
  ${({ theme }) => theme.scrollbar.HIDE};
`;
const TodoItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 3rem;
  padding: 0.925rem;
  gap: 0.5rem;
  border-radius: 10px;
  border: ${(props) =>
    props.role === 'add' ? '1px dashed #eee' : '1px solid #eee'};
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
    ${({ theme }) => theme.font.TODO_ITEM};
    input {
      width: 100%;
      font: inherit;
    }
  }
`;
const IconBox = styled.img`
  width: 1rem;
  height: auto;
  vertical-align: bottom;
`;
const CheckBox = styled.input`
  display: none;
`;
const DeleteBox = styled.img`
  width: 48px;
  margin-left: 10px;
  height: auto;
  max-height: 48px;
  background-color: #ff8181;
  border-radius: 10px;
`;
const AddBox = styled.img`
  width: 48px;
  margin-right: 10px;
  height: auto;
  max-height: 48px;
  background-color: #ff8181;
  border-radius: 10px;
`;

const Month = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
  ${({ theme }) => theme.font.BOLD};
  span {
    margin-right: 7px;
  }
`;

const DayWrap = styled.div`
  margin-top: 0.75rem;
  display: flex;
  gap: 0 10px;
  overflow-x: scroll;
  ${({ theme }) => theme.scrollbar.HIDE};
`;

const Day = styled.span`
  cursor: pointer;
  ${({ theme }) => theme.font.MEDIUM};
  font-size: 14px;
  text-align: center;
  color: #adadad;
  line-height: 1rem;
  min-width: 1rem;
  min-height: 1rem;
  max-width: 1rem;
  max-height: 1rem;
  &.active {
    color: #ff7b00;
  }
`;

export default TodoList;
