import { useEffect, useState } from "react";
import styled from "styled-components";
import ProjectTitle from "../../components/ProjectTitle";

interface ITodoItem {
    id: number,
    content: string,
    isChecked: boolean,
    date: Date
}

function TodoList() {
    let dummyTodos = [
        { id: 1, content: "test1", isChecked: false, date: new Date("2022-09-14") },
        { id: 2, content: "test2", isChecked: false, date: new Date("2022-09-14") },
        { id: 3, content: "test3", isChecked: true, date: new Date("2022-09-14") },
        { id: 4, content: "test4", isChecked: false, date: new Date("2022-09-14") },
        { id: 5, content: "test5", isChecked: false, date: new Date("2022-09-14") },
        { id: 6, content: "test6", isChecked: true, date: new Date("2022-09-14") },
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

    useEffect(() => {
        setTodos(dummyTodos)
    }, [])
    
    return (
        <>
            <ProjectTitle name="To Do List"/>
            <ul>
                {todos.map(({id, content, date, isChecked}: ITodoItem) => {
                    return (
                        <TodoItem key={id}>
                            <p className="check">
                                <i className={isChecked ? "ri-checkbox-line" : "ri-checkbox-blank-line"} onClick={() => onClickChecked(id)}></i>
                                <CheckBox
                                    className="input-checkbox"
                                    type="checkbox"
                                    defaultChecked={isChecked}
                                />
                            </p>
                            <p className="content"><input type="text" defaultValue={content}/></p>
                            <p className="date">{ date.toISOString().split('T')[0] }</p>
                        </TodoItem>
                    )
                })}
            </ul>
        </>
    )
}

const TodoItem = styled.li`
    display: flex;
    align-items: center;
    .check {}
    .content {}
    .date {}
`
const CheckBox = styled.input`
    display: none;
`

export default TodoList