import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onRemoveNote, onCopyNote, onPinNote, onSendAsEmail }) {
    console.log(notes)

    function onUpdateNote(noteId) {
        console.log('noteId', noteId)
    }

    return <section className="note-list" >
        {notes.map((note) => (
            <NotePreview
                note={note}
                onRemoveNote={onRemoveNote}
                onCopyNote={onCopyNote}
                onPinNote={onPinNote}
                onSendAsEmail={onSendAsEmail} />
        ))}
    </section >

}
