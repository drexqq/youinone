import { useState } from "react"

interface TodoInterface {
    content: string,
}

function TodoList() {
    const [todos, useTodos] = useState([])
    
    const rednerTodoList = todos.map((i, x) => {
        return (
            <li></li>
        )
    })

    return (
        <div>This is TodoList Project</div>
    )
}

export default TodoList