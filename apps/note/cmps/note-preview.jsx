

export function NotePreview({ note }) {

    const todos = note.info.todos
    // if(!note.info.todos) return <h1>Loading..</h1>
    if (note.info.todos) { var finalList = createTodos(todos) }
    // createTodos(todos)



    function createTodos(todos) {
        console.log('note.id', note.id)
        const todoList = todos.map(todo => {
            return <ul key={todo.txt}>
                <li>{todo.txt}</li>
            </ul>
        })
        return todoList
    }

    const { id, type, url, backgroundColor, title } = note



    return <article className="note-preview gallery-item" style={{ backgroundColor: note.backgroundColor }}>
        {/* {url && (
            <div className="url-container">
                {url.includes('image') && <img src={note.info.url} />}

            </div>
        )} */}
        <h2>{note.info.title}</h2>
        <h1>{note.info.txt}</h1>
        <h2>{note.info.label}</h2>
        <img src={note.info.url} />
        {finalList}
    </article>
}