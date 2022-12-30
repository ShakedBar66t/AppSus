const { useLocation, Link, NavLink } = ReactRouterDOM
const { createContext, useState } = React

import { MailFilter } from "../apps/mail/cmps/mail-filter.jsx"
import { mailService } from "../apps/mail/services/mail.service.js"


export function AppHeader({ useFilter }) {

    const FilterContext = createContext();
    const location = useLocation()
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    function onSetFilter(filterBy) {
        useFilter(filterBy)
    }

    return <header className="app-header">
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
        <FilterContext.Provider value={filterBy}>
            {location.pathname.startsWith('/mail') && <MailFilter onSetFilter={onSetFilter} />}
        </FilterContext.Provider>

        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail/inbox/">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/book">Books</NavLink>
        </nav>
    </header>
}
