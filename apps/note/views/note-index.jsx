const { useState, useEffect } = React

import { AddNote } from "../cmps/add-note.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { NoteEdit } from "./note-edit.jsx"

export function NoteIndex() {


    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query().then(notesToUpdate => {
            setNotes(notesToUpdate)})
    }

    function onSetFilter(filterBy){
    }

    return <section className="note-index">
        <AddNote />
        <NoteEdit />
        <NoteFilter onSetFilter={onSetFilter}/>
        <NoteList notes={notes} />
    </section>


}
