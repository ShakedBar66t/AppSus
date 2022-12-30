import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onRemoveNote, onCopyNote }) {
    console.log(notes)

    function onUpdateNote(noteId) {
        console.log('noteId', noteId)
    }

    return <section className="note-list" >
        {
            notes.map(note => <ul
                key={note.id}
                className="note"
                onClick={() => onUpdateNote(note.id)}>
                <NotePreview
                    note={note}
                    onRemoveNote={onRemoveNote}
                    onCopyNote={onCopyNote}  />
            </ul>)
        }
    </section >

}
