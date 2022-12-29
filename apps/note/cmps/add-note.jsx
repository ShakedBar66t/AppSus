import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
// import { NoteIndex } from "../views/note-index.jsx"

const { useState, useRef } = React
const { Link } = ReactRouterDOM

export function AddNote({ onAddNote }) {
    // console.log(onAddNote)

    const titleRef = useRef(null)
    const txtRef = useRef(null)
    const colorRef = useRef(null)

    const [isExpanded, setExpanded] = useState(false)
    const [note, setNote] = useState({
        type: '',
        file: '',
        backgroundColor: '',
        info: {
            txt: '',
            url: '',
            title: '',
            label: '',
            todos: ''
        },
    })

    function onSaveNote(ev) {
        console.log('ohados kabanos')
        ev.preventDefault()
        noteService.saveNote(note).then(() => {
            console.log(note)
        })
    }

    function handleChange(e) {
        console.log(e)
        const { name: field, value } = e.target
        console.log('value', value)
        setNote((preValue) => {
            if (field === 'backgroundColor') {
                note[field] = value
            } else {
                note.info[field] = value
            }
            return {
                ...preValue
            }

        }
        )
    }

    function handleExpanded() {
        setExpanded(true)
    }

    return (
        <div>
            <form className="note-form" onSubmit={onSaveNote}>
                {isExpanded && (
                    <input
                        value={note.info.title}
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}
                        ref={titleRef} />
                )}

                <p>
                    <textarea
                        type="text"
                        value={note.info.txt}
                        onClick={handleExpanded}
                        name="txt"
                        placeholder="Take a note.."
                        onChange={handleChange}
                        rows={isExpanded ? 3 : 1}
                        ref={txtRef}
                    ></textarea>
                </p>
                <input
                    value={note.backgroundColor}
                    type="color"
                    name="backgroundColor"
                    onChange={handleChange}
                    onClick={handleExpanded}
                    rows={isExpanded ? 3 : 1}
                    ref={colorRef} />
                <button type="submit">
                    Close
                </button>
            </form>
        </div>
    )


}
