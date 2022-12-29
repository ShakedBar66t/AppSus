const { useState, Fragment } = React
const { NavLink, Link, useParams } = ReactRouterDOM

import { MailCompose } from '../views/mail-compose.jsx';

export function MailNav() {
    const [isComposeOpen, setIsComposeOpen] = useState(false);

    return (<Fragment>
        <ul className="mail-nav clean-list">
            <li className="menu-item">
                <button onClick={() => setIsComposeOpen(true)}>
                    <i className="fa fa-pencil" aria-hidden="true" /> Compose
                </button>
            </li>
            <NavLink to="/mail/inbox/" className="menu-item">
                <i className="fa fa-envelope-open-o" aria-hidden="true" /> Inbox
            </NavLink>
            <NavLink to="/mail/inbox/starred" className="menu-item">
                <i className="fa fa-star-o" aria-hidden="true" /> Starred
            </NavLink>
            <NavLink to="/mail/inbox/sent" className="menu-item">
                <i className="fa fa-paper-plane-o" aria-hidden="true" /> Sent
            </NavLink>
            <NavLink to="/mail/inbox/drafts" className="menu-item">
                <i className="fa fa-file-o" aria-hidden="true" /> Drafts
            </NavLink>
            <NavLink to="/mail/inbox/bin" className="menu-item">
                <i className="fa fa-trash" aria-hidden="true" /> Bin
            </NavLink>
        </ul>
        {isComposeOpen && <MailCompose setIsOpen={setIsComposeOpen} />}
    </Fragment>
    );
}