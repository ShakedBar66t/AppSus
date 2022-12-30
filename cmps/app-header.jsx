import { MailFilter } from "../apps/mail/cmps/mail-filter.jsx"

const { Link, NavLink } = ReactRouterDOM


export function AppHeader() {

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
            </div>        </Link>
        <MailFilter />
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail/inbox/">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/book">Books</NavLink>
        </nav>
    </header>
}
