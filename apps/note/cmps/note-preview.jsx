

export function NotePreview({ note }) {

    function onRemoveNote(e, noteId){
        onRemoveNote(noteId)
    }

    const todos = note.info.todos
    // if(!note.info.todos) return <h1>Loading..</h1>
    if (note.info.todos) { var finalList = createTodos(todos) }
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

    const { id, type, url, backgroundColor, title } = note



    return <article className="note-preview gallery-item" style={{ backgroundColor: note.backgroundColor }}>
        {/* {url && (
            <div className="url-container">
                {url.includes('image') && <img src={note.info.url} />}

            </div>
        )} */}
        <h1>{note.info.txt}</h1>
        <h1>{note.info.title}</h1>
        <h1>{note.info.label}</h1>
        <img src={note.info.url} />
        {finalList}
    </article>
}