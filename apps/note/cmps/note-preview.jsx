
const { Link } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote, onCopyNote, onPinNote, onSendAsEmail }) {

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

    const media = note.info.url
    console.log(media)



    return (
        <Link
            to={`/note/edit/${note.id}`}
            className="note-preview gallery-item"
            style={{ backgroundColor: note.backgroundColor }}>
            {media && (
                <div className="url-container">
                    {media.includes('image') && <img src={media} />}
                    {media.includes('video') && (
                        <video width="320" height="240" controls>
                            <source src={media} type="video/mp4" />
                        </video>
                    )}
                    {media.includes('audio') && (
                        <div className="audio-container">
                            <audio controls>
                                <source src={media} type="audio/mpeg"></source>
                            </audio>
                        </div>
                    )}
                </div>
            )}
            <div className="text-container">
                <h2>{note.info.title}</h2>
                <h1>{note.info.txt}</h1>
                <h2>{note.info.label}</h2>
                {finalList}
            </div>
            <div className="note-btn">
                <div className="btn-flex">
                    <button onClick={(e) => onRemoveNote(e, note.id)}>
                        <i className="fa-solid fa-2x fa-trash-can"></i>
                    </button>
                    <button onClick={(e) => onCopyNote(e, note.id)}>
                        <i className="fa-solid fa-2x fa-clipboard"></i>
                    </button>
                    <button onClick={(e) => onPinNote(e, note.id)}>
                        <i className="fa-solid fa-2x fa-map-pin"></i>
                    </button>
                    <button onClick={(e) => onSendAsEmail(e, note.id)}>
                        <i className="fa-solid fa-2x fa-envelope"></i>
                    </button>
                </div>
            </div>
        </Link>
    )
}