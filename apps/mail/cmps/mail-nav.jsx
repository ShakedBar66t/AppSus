const { useState } = React
const { Link, NavLink } = ReactRouterDOM


export function MailNav() {

    return <ul className="mail-nav clean-list">

        <NavLink to="/mail/inbox/" className="menu-item"><i className="fa fa-pencil" aria-hidden="true"></i> Compose</NavLink>
        <NavLink to="/mail/inbox/" className="menu-item"><i className="fa fa-envelope-open-o" aria-hidden="true" ></i> Inbox</NavLink>
        <NavLink to="/mail/inbox/starred" className="menu-item"><i className="fa fa-star-o" aria-hidden="true"></i> Starred</NavLink>
        <NavLink to="/mail/inbox/sent" className="menu-item"><i className="fa fa-paper-plane-o" aria-hidden="true"></i> Sent</NavLink>
        <NavLink to="/mail/inbox/drafts" className="menu-item"><i className="fa fa-file-o" aria-hidden="true"></i> Drafts</NavLink>
        <NavLink to="/mail/inbox/bin" className="menu-item"><i className="fa fa-trash" aria-hidden="true"></i> Bin</NavLink>
    </ul>

}