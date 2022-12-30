import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onRemoveNote }) {
    console.log(notes)

    function onUpdateNote(noteId) {
        console.log('noteId', noteId)
    }

    return <section className="note-list grid" >
        {
            notes.map(note => <ul
                key={note.id}
                className="note"
                onClick={() => onUpdateNote(note.id)}>
                <NotePreview
                    note={note}
                    onRemoveNote={onRemoveNote}  />
            </ul>)
        }
    </section >

}
