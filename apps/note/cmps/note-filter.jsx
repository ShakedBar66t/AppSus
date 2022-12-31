import { noteService } from "../services/note.service.js"

const { useState, useRef, useEffect } = React
export function NoteFilter({onSetFilter}) {


    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())
    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({target}){
        let {value, name:field} = target
        setFilterByToEdit((prevFilter) => ({...prevFilter, [field]: value}))
    }
    
    function onSubmitFilter(ev){
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }



    return <section className="note-filter">
        <form
            className="form-filter flex align-center"
            onSubmit={onSubmitFilter}>
            <label htmlFor="name">
                <input
                    className="note-filter-item"
                    type="text"
                    name="name"
                    placeholder="Search Note"
                    value={filterByToEdit.title}
                    ref={elInputRef}
                    onChange={handleChange}
                     />
            </label>
        </form>
    </section>
}