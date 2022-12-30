
const { useState, useEffect } = React

import { AddNote } from "../cmps/add-note.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
// import { NoteEdit } from "./note-edit.jsx"

export function NoteIndex() {

    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])
    const [change, setChange] = useState(true)
    const [updateFromAdd, setupdateFromAdd] = useState([false])

    useEffect(() => {
        // debugger
        console.log('start')
        loadNotes()
    }, [updateFromAdd])

    function updateNotes() {
        setupdateFromAdd(!updateFromAdd)
    }

    function loadNotes() {
        noteService.query().then(notesToUpdate => {
            setNotes(notesToUpdate)
            setChange(!change)
        })
    }

    function onSetFilter(filterBy) {
    }

    function onRemoveNote(noteId) {
        console.log('Removing', noteId);
        noteService.remove(noteId).then(() => {
            console.log('Removed')
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
        })
    }

    function onCopyNote(noteId) {
        debugger
        setChange(!change)
        noteService.copyNote(noteId).then(() => {
            console.log('copied')
        })
    }


    return <section className="note-index">
        <AddNote updateNotes={updateNotes} />
        {/* <NoteFilter onSetFilter={onSetFilter} /> */}
        <NoteList
            notes={notes}
            onRemoveNote={onRemoveNote}
            onCopyNote={onCopyNote} />
    </section>


}
