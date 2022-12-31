const { useState, useEffect, useRef } = React

import { MailList } from "../cmps/mail-list.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { MailCompose } from '../views/mail-compose.jsx';
import { mailService } from "../services/mail.service.js"


export function MailIndex({ filterByFromFilter }) {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [mails, setMails] = useState([])
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [unreadMailsCount, setUnreadMailsCount] = useState()

    useEffect(() => {
        setFilterBy(filterByFromFilter);
        loadMails();
        mailService.getUnreadCount().then(count => {
            setUnreadMailsCount(count);
        });
    }, [filterBy, filterByFromFilter]);

    function mailRead(isRead) {
        if (isRead) setUnreadMailsCount(unreadMailsCount + 1)
        else setUnreadMailsCount(unreadMailsCount - 1)

    }

    // function loadMails(filter = filterBy) {
    //     console.log(filter)
    //     mailService.query(filter).then(mailsToUpdate => {
    //         setMails(mailsToUpdate)
    //     })
    // }

    function loadMails(read = null, filter = filterBy) {
        mailService.query(read, filter).then(mailsToUpdate => {
            setMails(mailsToUpdate);
        });
    }


    return <div className="mail-index ">

        <div className="filter-container">
            {/* <MailFilter /> */}
        </div>
        <div className="cmps-container">
            <div className="nav-container">  <MailNav setIsOpen={setIsComposeOpen} loadMails={loadMails} unreadMailsCount={unreadMailsCount} /></div>
            <div className="mail-list-container">
                <MailList mails={mails} mailRead={mailRead} />
            </div>
            <div className={(isComposeOpen) ? "mail-compose-container" : "mail-compose-container hidden"}>
                {/* <div className="mail-compose-container"> */}
                {isComposeOpen && <MailCompose filterByFromFilter={filterByFromFilter} setIsOpen={setIsComposeOpen} loadMails={loadMails} />}
            </div>
        </div>
    </div >
}

