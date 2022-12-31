const { useLocation, Link } = ReactRouterDOM
const { createContext, useState } = React

import { MailFilter } from "../apps/mail/cmps/mail-filter.jsx"
import { mailService } from "../apps/mail/services/mail.service.js"
import { NoteFilter } from "../apps/note/cmps/note-filter.jsx"
import { HeaderModal } from "./header-modal.jsx"


export function AppHeader({ useFilter }) {


    const FilterContext = createContext();
    const location = useLocation()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [modal, setModal] = useState('hide-modal')

    function toggleModal() {
        if (modal === 'hide-modal') setModal({ modal: 'show-modal' })
        else setModal({ modal: 'hide-modal' })
    }

    function closeModal() {
        setModal({ modal: 'hide-modal' })
    }


    function onSetFilter(filterBy) {
        console.log(filterBy)
        useFilter(filterBy)
    }

    const modalStyle = modal

    return (
        <section className="app-header">
            <section className="header-wrapper">
                <Link to="/">
                    <div className="logo-wrapper">
                        <h1>
                            <span className='a-1'>A</span>
                            <span className='p-1'>p</span>
                            <span className='p-2'>p</span>
                            <span className='s-1'>s</span>
                            <span className='u'>u</span>
                            <span className='s-2'>s</span>
                        </h1>
                    </div>
                </Link>
                <div className="navbar-wrapper flex align-center">
                    <button onClick={toggleModal}>
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
                <div className={`modal ${modalStyle}`}>
                    <HeaderModal onCloseModal={closeModal} />
                </div>
                <FilterContext.Provider value={filterBy}>
                    {location.pathname.startsWith('/mail') && <MailFilter onSetFilter={onSetFilter} />}
                    {location.pathname.startsWith('/note') && <NoteFilter onSetFilter={onSetFilter} />}
                </FilterContext.Provider>
            </section>
        </section>
    )
}
