const { useState, Fragment } = React
const { NavLink, Link, useParams } = ReactRouterDOM

export function MailNav({ setIsOpen, loadMails, unreadMailsCount }) {
    return <div className="sibe-bar">

        <button className="compose" onClick={() => { setIsOpen(true) }}>
            <span className="icon fa fa-pencil" aria-hidden="true" />Compose
        </button>
        <NavLink to="/mail/inbox/" className="menu-item side-bar-option " onClick={(() => loadMails({ txt: '' }))}>
            <i className="icon fa fa-envelope-open-o" aria-hidden="true"></i>
            <span >Inbox</span>
            <span>{unreadMailsCount}</span>
        </NavLink>

        <NavLink to="/mail/inbox/starred" className="menu-item side-bar-option" onClick={(() => loadMails({ txt: '' }))}>
            <i className="option-star icon fa fa-star-o" aria-hidden="true" ></i>
            <span>Starred</span>
        </NavLink>

        <NavLink to="/mail/inbox/sent" className="menu-item side-bar-option" onClick={(() => loadMails({ txt: '' }))}>
            <i className="icon fa fa-paper-plane-o" aria-hidden="true" />
            <span>  Sent</span>
        </NavLink>

        <NavLink to="/mail/inbox/drafts" className="menu-item side-bar-option" onClick={(() => loadMails({ txt: '' }))}>
            <i className="icon fa fa-file-o" aria-hidden="true" />
            <span> Drafts</span>
        </NavLink>

        <NavLink to="/mail/inbox/bin" className="side-bar-option menu-item" >
            <i className="icon fa fa-trash" aria-hidden="true" />
            <span> Bin</span>
        </NavLink>

    </div >

}