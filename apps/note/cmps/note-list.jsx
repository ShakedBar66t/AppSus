import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onRemoveNote }) {
    console.log(notes)

    function onUpdateNote(noteId){
        console.log('noteId', noteId)
    }

    return <section className="note-list grid" >
        {
            notes.map(note => <li
                key={note.id}
                className="note"
                onClick={() => onUpdateNote(note.id)}>
                <NotePreview
                    note={note} />
                <div>
                    <button onClick={() => onRemoveNote(note.id)}>
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </li>)
        }
        {/* {notes.map(note =>
            <NotePreview
                note={note}
                key={note.id}
                />                
        )} */}
    </section >

}
