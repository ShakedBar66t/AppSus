

export function NotePreview({ note, onRemoveNote }) {

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
        {url && (
            <div className="url-container">
                {url.includes('image') && <img src={note.info.url} alt="error" />}

            </div>
        )}
        <h2>{note.info.title}</h2>
        <h1>{note.info.txt}</h1>
        <h2>{note.info.label}</h2>
        <img src={note.info.url} />
        {finalList}
        <div className="note-btn">
            <div className="btn-flex">
                <button className="" onClick={() => onRemoveNote(note.id)}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>
                <button onClick={() => onCopyNote(note.id)}>
                    <i className="fa-solid fa-clipboard"></i>
                </button>
                <button onClick={() => onPinNote(note.id)}>
                    <i className="fa-solid fa-map-pin"></i>
                </button>
                <button onClick={() => onSendAsEmail(note.id)}>
                    <i className="fa-solid fa-envelope"></i>
                </button>
            </div>
        </div>
    </article>
}