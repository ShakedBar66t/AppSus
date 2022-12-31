
const { useState, useEffect } = React

import { AddNote } from "../cmps/add-note.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
// import { NoteEdit } from "./note-edit.jsx"

export function NoteIndex() {

    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])
    const [updateFromAdd, setupdateFromAdd] = useState([false])

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function updateNotes() {
        setupdateFromAdd(!updateFromAdd)
    }

    function loadNotes() {
        noteService.query(filterBy).then(notes => {
            setNotes(notes)
        })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveNote(e, noteId) {
        e.preventDefault()
        console.log('Removing', noteId);
        noteService.remove(noteId).then(() => {
            console.log('Removed')
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
        })
    }

    function onCopyNote(e, noteId) {
        e.preventDefault()
        noteService.copyNote(noteId).then(() => {
            loadNotes()
        })
    }

    function onPinNote(e, noteId){
        e.preventDefault()
        noteService.pinNote(noteId).then(() => {
            loadNotes()
        })
    }

    function onSendAsEmail(){
        
    }


    return <section className="note-index">
        <AddNote updateNotes={updateNotes} />
        <NoteList
            notes={notes}
            onRemoveNote={onRemoveNote}
            onCopyNote={onCopyNote}
            onPinNote={onPinNote}
            onSendAsEmail={onSendAsEmail} />
    </section>


}
