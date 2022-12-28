const { useState, useEffect} = React

import { noteService } from "../services/note.service.js"

export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    })

    function loadNotes(){
        noteService.query().then(notes => setNotes(notes))
    }

    return <section className="note-index">

        {JSON.stringify(notes)}
    </section>


}
