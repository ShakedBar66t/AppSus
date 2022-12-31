import { utilService } from "../../../services/util.service.js"

const { useState, useEffect } = React


export function NoteTodo() {

    const [todoToEdit, setToDoToEdit] = useState({
        newTextLine: '',
        todos: []
    })

    function onTodos(ev) {
        ev.preventDefault()
    }

    function onSubmit(ev) {
        ev.preventDefault()
        setToDoToEdit.toObject().then((obj) => onSaveTodo(obj))
    }

    function toObject() {
        const todos = todoToEdit.todos
        var obj = {}
        for (var i = 0; i < todos.length; i++) {
            obj[i] = todos[i]
        }
        return Promise.resolve(obj)
    }

    function handleChange({ target }) {
        const val = target.value
        setToDoToEdit({ newTextLine: val })
    }

    function onAddNewLine(ev) {
        ev.preventDefault()
        const todos = todoToEdit.todos
        const textLine = [utilService.makeId(3), todoToEdit.newTextLine, false]
        todos.push(textLine)
        setToDoToEdit({ newTextLine: '' })
    }

    function onDeleteTodo(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        const arr = todoToEdit.todos
        const todoId = ev.target.value
        const newArr = arr.filter((todo) => todo[0] !== todoId)
        setToDoToEdit({ todos: newArr })
    }




    const todosArr = todoToEdit.todos
    console.log(todosArr)
    return (
        <div className="todo-container" >
            <form className="todos-form" onSubmit={onSubmit}>
                <input
                    type="text"
                    name="new-line"
                    onChange={handleChange}
                    placeholder="Add a todo"
                    value={todoToEdit.newTextLine}
                />
                <section className="todo-btn-container">
                    <button onClick={onAddNewLine}>Add todo</button>
                    <button>Save todo list</button>
                </section>
            </form>
            <div className="todo-container">
                <ul>
                    {todosArr.map((todo) => (
                        <li key={todo[0]} value={todo[0]}>
                            {todo[1]}
                            <button
                                className="delete"
                                value={todo[0]}
                                onClick={onDeleteTodo}
                            >
                                x
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}