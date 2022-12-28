import { uploadService } from '../../../services/upload.service.js'
import { noteService } from '../services/note.service.js'
 const {useState} = React

export function NoteEdit() {

    
    const note = {
        type: '',
        txt: '',
        file: '',
        backgroundColor: '',
        todos: '',
        info: '',
        title: ''
    }
    console.log(note)
    const [noteToEdit, setNoteToEdit] = useState({note})

    function onSaveNote() {

    }

    function handleChange({target}) {
        const field = target.name
        console.log('field', field)
        const value = target.value
        console.log('value', value)

        if ( field === 'file') {
            uploadService.readURL(target.files).then((uploadedFile) =>
            useState((prevState) => ({
                note: {...prevState.note, file:uploadedFile}
            }))
            )
        }
        useState((prevState) => ({
            note: {...prevState.note, [field]: value}
        }))
    }
    const { title, txt, file, backgroundColor } = note
    return (
        <section className="note-edit">
            <h2>Edit Note</h2>
            <form className="note-form" onSubmit={onSaveNote}>
                <input
                    className="title-input"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="title"
                    value={title} />
                <textarea
                    className="txt-input"
                    type="text"
                    name="txt"
                    onChange={handleChange}
                    placeholder="Enter text here"
                    value={txt}
                />
                <input
                    className="color-input"
                    type="color"
                    name="backgroundColor"
                    onChange={handleChange}
                />
                <input
                    className="file-input"
                    type="file"
                    name="file"
                    onChange={handleChange}
                />
                <button className="save-btn" type="submit">Save</button>
            </form>
        </section>
    )
}