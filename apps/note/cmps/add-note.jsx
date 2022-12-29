import { noteService } from "../services/note.service.js"

const { useState } = React
const { Link } = ReactRouterDOM

export function AddNote({ onAdd }) {

    const [isExpanded, setExpanded] = useState(false)
    const [note, setNote] = useState({
        type: '',
        txt: '',
        file: '',
        backgroundColor: '',
        todos: '',
        info: '',
        title: ''
    })

    function onSaveNote(ev){
        ev.preventDefault()
        noteService.saveNote(note).then(() => {
            this.props.history.push('/note')
        })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setNote((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })
    }

    function handleExpanded() {
        setExpanded(true)
    }

    function submitButton(event) {
        onAdd(note)
        setNote({
            type: '',
            txt: '',
            file: '',
            backgroundColor: '',
            todos: '',
            info: '',
            title: ''
        })
        event.preventDefault()
    }

    return (
        <div>
            <form className="note-form" onSubmit={onSaveNote}>
                {isExpanded && (
                    <input
                        value={note.title}
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange} />
                )}

                <p>
                    <textarea
                        value={note.txt}
                        onClick={handleExpanded}
                        name="txt"
                        placeholder="Take a note.."
                        onChange={handleChange}
                        rows={isExpanded ? 3 : 1}
                    ></textarea>
                </p>
                <button onClick={submitButton}>
                    Close
                </button>
            </form>
        </div>
    )


}
