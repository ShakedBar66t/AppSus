const { useState, useEffect, useRef } = React

import { mailService } from "../services/mail.service.js"

export function MailFilter() {

    // const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())
    const elInputRef = useRef(null)

    // useEffect(() => {
    //     elInputRef.current.focus()
    // }, [])

    // useEffect(() => {
    //     // update father cmp that filters change very type
    //     onSetFilter(filterByToEdit)
    // }, [filterByToEdit])

    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     value = (type === 'number') ? +value : value
    //     setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    // }

    // function onSubmitFilter(ev) {
    //     // update father cmp that filters change on submit
    //     ev.preventDefault()
    //     onSetFilter(filterByToEdit)
    // }

    function deleteInput() {
        elInputRef.current.value = '';
    }


    return <section className="mail-filter full main-layout">
        <form className="mail-filter-form">
            <button className="search-btn fa fa-search"></button>
            <input className="search-input"
                type="text"
                id="vendor"
                name="txt"
                placeholder="Search mail"
                // value={filterByToEdit.txt}
                // onChange={handleChange}
                ref={elInputRef}
            />

            {/* <span className="fa fa-search" aria-hidden="true" /> */}
            <button onClick={() => deleteInput()} className="search-btn fa fa-times"></button>
        </form>

    </section>
}