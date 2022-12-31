import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onRemoveNote, onCopyNote, onPinNote, onSendAsEmail }) {

    return <section className="note-list" >
        {notes.map((note) => (
            <NotePreview
                note={note}
                key={note.id}
                onRemoveNote={onRemoveNote}
                onCopyNote={onCopyNote}
                onPinNote={onPinNote}
                onSendAsEmail={onSendAsEmail} />
        ))}
    </section >

}
