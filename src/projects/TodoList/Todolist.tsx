import { HTMLAttributes, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ProjectTitle from "../../components/ProjectTitle";

interface ITodoItem {
    id: number,
    content: string,
    isChecked: boolean,
    date: Date
}

function TodoList() {
    let dummyTodos = [
        { id: 1, content: "test1", isChecked: false, date: new Date("2022-09-01") },
        { id: 2, content: "test2", isChecked: false, date: new Date("2022-09-02") },
        { id: 3, content: "test3", isChecked: true, date: new Date("2022-09-04") },
        { id: 4, content: "test4", isChecked: false, date: new Date("2022-09-06") },
        { id: 5, content: "test5", isChecked: false, date: new Date("2022-09-07") },
        { id: 6, content: "test6", isChecked: true, date: new Date("2022-09-08") },
        { id: 7, content: "test7", isChecked: true, date: new Date("2022-09-09") },
        { id: 8, content: "test8", isChecked: true, date: new Date("2022-09-10") },
        { id: 9, content: "test9", isChecked: true, date: new Date("2022-09-12") },
        { id: 10, content: "test10", isChecked: true, date: new Date("2022-09-14") },
    ]
    const [todos, setTodos] = useState<ITodoItem[]>([]);
    /**
     * @param id number 투두리스트의 체크표시 클릭시 발생 @param0
     */
    const onClickChecked = (id: number) => {
        setTodos(
            todos.map((todo): ITodoItem => {
                if (todo.id === id) todo.isChecked = !todo.isChecked
                return todo
            })
        )
    }
    /**
     * 클릭시 애니메이션
     */
    const onClickAnim = (e: React.MouseEvent<Element, MouseEvent>) => {
        let deleteBtn = e.target as Element
        deleteBtn.classList.add("anim")
        if (deleteBtn.nodeName !== "DIV") {
            deleteBtn = deleteBtn.parentNode as Element
        }
        setTimeout(() => {deleteBtn.classList.remove("anim")}, 500)
    }

    useEffect(() => {
        setTodos(dummyTodos)
    }, [])
    
    return (
        <>
            <ProjectTitle name="ToDoList"/>
            <TodoWrap>
                {todos.map(({id, content, isChecked}: ITodoItem) => {
                    return (
                        <TodoItem key={id}>
                            <IconBox className="check" onClick={() => onClickChecked(id)}>
                                <i className={isChecked ? "ri-checkbox-circle-line checked" : "ri-checkbox-blank-circle-line"}>
                                </i>
                                <CheckBox
                                    className="input-checkbox"
                                    type="checkbox"
                                    defaultChecked={isChecked}
                                />
                            </IconBox>
                            <div className="content"><input type="text" defaultValue={content}/></div>
                            <IconBox
                                className="delete"
                                onClick={(e) => onClickAnim(e)}
                            >
                                <i className="ri-delete-bin-7-line"></i>
                            </IconBox>
                        </TodoItem>
                    )
                })}
            </TodoWrap>
        </>
    )
}
const anim = keyframes`
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(255, 31, 65, 0.4);
      box-shadow: 0 0 0 0 rgba(255, 31, 65, 0.4);
      background-color: rgba(255, 31, 65, 0.4)
    }
    70% {
        -moz-box-shadow: 0 0 0 10px rgba(255, 31, 65, 0);
        box-shadow: 0 0 0 10px rgba(255, 31, 65, 0);
        background-color: rgba(255, 31, 65, 0)
    }
    100% {
        -moz-box-shadow: 0 0 0 0 rgba(255, 31, 65, 0);
        box-shadow: 0 0 0 0 rgba(255, 31, 65, 0);
        background-color: rgba(255, 31, 65, 0)
    }
  }`
const TodoWrap = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 0;
    margin: 1rem 0;
`
const TodoItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2rem;
    .check {
        width: 2rem;
        display: flex;
        align-items: center;
        font-size: 1rem;
        i {
            transition: color .25s ease;
            &.checked {
                color: #3498db;
            }
        }
    }
    .content {
        width: calc(100% - 5rem);
        height: 100%;
        border-bottom: 1px solid #eee;
        input {
            width: 100%;
            height: 100%;
            border: 0;
            font-size: 1rem;
        }
    }
    .delete {
        width: 2rem;
        display: flex;
        align-items: center;
        font-size: 1rem;
        i {
            color: #ff1f41;
        }
    }
`
const IconBox = styled.div`
    height: 100%;
    text-align: center;
    position: relative;
    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    &.anim:before {
        animation: ${anim} .5s forwards;
    }
    i {
        display: inline-block;
        width: 100%;
    }
`
const CheckBox = styled.input`
    display: none;
`

export default TodoList