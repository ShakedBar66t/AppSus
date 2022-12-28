
export function NotePreview({ note }) {

    const todos = note.info.todos
    // if(!note.info.todos) return <h1>Loading..</h1>
    if(note.info.todos) {var finalList = createTodos(todos)}
    // createTodos(todos)
    console.log(finalList)
    
    
    function createTodos(todos) {
        const todoList = todos.map(todo => {
            return <ul>
                <li>{todo.txt}</li>
            </ul>
        })
        return todoList
    }



    return <article className="note-preview gallery-item">
        <h3>{note.type}</h3>
        <h2>{note.info.txt}</h2>
        <h2>{note.info.title}</h2>
        {finalList}
    </article>
}