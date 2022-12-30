import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { uploadService } from "../../../services/upload.service.js"
// import { NoteIndex } from "../views/note-index.jsx"

const { useState, useRef } = React
const { Link } = ReactRouterDOM

export function AddNote({ updateNotes }) {
    // console.log(onAddNote)
    const titleRef = useRef(null)
    const txtRef = useRef(null)
    const colorRef = useRef(null)
    const urlRef = useRef(null)

    const [isExpanded, setExpanded] = useState(false)
    const [note, setNote] = useState({
        type: '',
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
        updateNotes()
        console.log('ohados kabanos')
        ev.preventDefault()
        noteService.saveNote(note).then(() => {
            console.log(note)
        })
    }

    function handleChange(e) {
        console.log(e)
        const { name: field, value } = e.target
        console.log('value', e.target.files)
        setNote((preValue) => {
            if (field === 'backgroundColor') {
                note[field] = value
            } else {
                note.info[field] = value
            }

            if (field === 'url'){
                uploadService.readURL(e.target.files).then((uploadedFile)=>
                note.info[field] = uploadedFile
                )
            }
            return {
                ...preValue
            }
        })
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
                        onChange={handleChange} />
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
                <input
                    className="url-input"
                    type="file"
                    name="url"
                    onChange={handleChange}
                    onClick={handleExpanded}
                    rows={isExpanded ? 3 : 1}
                    ref={urlRef}
                />
                <button type="submit" className="close-btn">
                    Close
                </button>
            </form>
        </div>
    )


}
