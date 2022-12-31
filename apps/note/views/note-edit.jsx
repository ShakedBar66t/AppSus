
const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { uploadService } from "../../../services/upload.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { NoteTodo } from "../cmps/note-todo.jsx"


export function NoteEdit() {

    const { noteId } = useParams()
    const navigate = useNavigate()

    const [noteToEdit, setNoteToEdit] = useState({
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

    function onSaveTodo() {

    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.saveNote(noteToEdit).then((note) => {
            console.log('note saved', note)
            navigate('/note')
            showSuccessMsg('Note Saved')
        })

    }

    function loadNotes() {
        noteService.get(noteId)
            .then((note) => setNoteToEdit(note))
            .catch((err) => {
                console.log('Had issues in note details', err)
            })
    }

    useEffect(() => {
        if (!noteId) return
        loadNotes()
    }, [])

    function handleEditChange({ target }) {
        let { value, type, name: field } = target
        setNoteToEdit((prevNote) => {
            if (field === 'backgroundColor') {
                noteToEdit[field] = value
            } else {
                noteToEdit.info[field] = value
            }

            if (field === 'url') {
                uploadService.readURL(target.files).then((uploadedFile) =>
                    noteToEdit.info[field] = uploadedFile
                )
            }
            return {
                ...prevNote
            }
        })
    }


    return (
        <div className="note-edit">
            <form className="note-form" onSubmit={onSaveNote}>
                {/* {isExpanded && ( */}
                <input
                    value={noteToEdit.info.title}
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleEditChange}
                />
                {/* )} */}

                <p>
                    <textarea
                        type="text"
                        value={noteToEdit.info.txt}
                        // onClick={handleExpanded}
                        name="txt"
                        placeholder="Take a note.."
                        onChange={handleEditChange}
                    // rows={isExpanded ? 3 : 1}
                    ></textarea>
                </p>
                <input
                    value={noteToEdit.backgroundColor}
                    type="color"
                    name="backgroundColor"
                    onChange={handleEditChange}
                // onClick={handleExpanded}
                // rows={isExpanded ? 3 : 1}
                />
                <input
                    className="url-input"
                    type="file"
                    name="url"
                    onChange={handleEditChange}
                // onClick={handleExpanded}
                // rows={isExpanded ? 3 : 1}
                />
                <button type="submit" className="close-btn">
                    Close
                </button>
            </form>
                {/* <NoteTodo onSaveTodo={onSaveTodo} /> */}
        </div>
    )
}