const { useState, useEffect, useRef } = React

export function MailFilter({ onSetFilter }) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isRead, setIsRead] = useState(null)
    const [filterBy, setFilterBy] = useState({ txt: '', isRead: null })
    const elInputRef = useRef({ txt: '' })

    function handleChange(event) {
        console.log(filterBy)
        const { value } = event.target
        setFilterBy({ txt: value })
    }

    function onSubmitFilter(event) {
        console.log('h')
        event.preventDefault()
        setFilterBy({ ...filterBy, txt: elInputRef.current.value }) // update the txt property in the filterBy object
        onSetFilter(filterBy)
    }
    function handleStatusChange(value) {
        event.preventDefault()
        console.log('handleStatusChange called:', value)
        setIsRead(value)
        // console.log({ txt: elInputRef.current.value, isRead: isRead })
        onSetFilter({ txt: elInputRef.current.value, isRead: value })
    }
    function deleteInput() {
        elInputRef.current.value = ''
    }

    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <section className="mail-filter ">
            <form className="mail-filter-form" onSubmit={onSubmitFilter}>
                <button className="search-btn  fa fa-search" />
                <input
                    className="search-input"
                    type="text"
                    id="vendor"
                    name="txt"
                    placeholder="Search mail"
                    ref={elInputRef}
                    value={elInputRef.current.value}
                    onChange={handleChange}
                />
                <span onClick={deleteInput} className=" close fa fa-times" />
                <div className="dropdown">
                    <div className="fa fa-filter select" onClick={toggleDropdown} />
                    <ul
                        className={
                            isDropdownOpen ? 'menu flex active clean-list' : 'menu flex clean-list'
                        }
                    >
                        <li onClick={() => handleStatusChange(null)} className="menu-item btn-nav">All</li>
                        <li onClick={() => handleStatusChange(true)} className="menu-item btn-nav">Read</li>
                        <li onClick={() => handleStatusChange(false)} className="menu-item btn-nav">Unread</li>
                    </ul>
                </div >
            </form >
        </section >
    )

}
