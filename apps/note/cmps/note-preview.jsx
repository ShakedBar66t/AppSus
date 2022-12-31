const { useState, Fragment } = React


export function NotePreview({ note, onRemoveNote, onCopyNote }) {

    const todos = note.info.todos
    // if(!note.info.todos) return <h1>Loading..</h1>
    if (note.info.todos) { var finalList = createTodos(todos) }
    // createTodos(todos)

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        // Read the contents of the file and set the file URL in state
        uploadService.readURL(file).then((fileURL) => {
            setFileURL(fileURL);
        })

    }

    { console.log(note.id, note.info.url) }

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
                {url.includes('image') && <img src={note.info.url} />}

            </div>
        )}
        <h2>{note.info.title}</h2>
        <h1>{note.info.txt}</h1>
        <h2>{note.info.label}</h2>
        <img src={note.info.url} />
        {finalList}
        <div className="note-btn">
            <div className="btn-flex">
                <button onClick={() => onRemoveNote(note.id)}>
                    <i className="fa-solid fa-2x fa-trash-can"></i>
                </button>
                <button onClick={() => onCopyNote(note.id)}>
                    <i className="fa-solid fa-2x fa-clipboard"></i>
                </button>
                <button onClick={() => onPinNote(note.id)}>
                    <i className="fa-solid fa-2x fa-map-pin"></i>
                </button>
                <button onClick={() => onSendAsEmail(note.id)}>
                    <i className="fa-solid fa-2x fa-envelope"></i>
                </button>
            </div>
        </div>
    </article>
}
