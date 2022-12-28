import { noteService } from "../services/note.service.js"

const { useState, setState } = React

export function NoteFilter({onSetFilter}) {


    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter.filterByToEdit, [field]: value }
        })
    }

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="note-filter">
        hello from note filter
        <form
            className="form-filter flex align-center"
            onSubmit={onFilter}>
            <label htmlFor="name">
                <input
                    type="text"
                    name="name"
                    placeholder="Search Note"
                    className="note-filter-item"
                    onChange={handleChange} />
            </label>
        </form>
    </section>
}