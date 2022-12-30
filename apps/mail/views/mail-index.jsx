const { useState, useEffect, useRef } = React
const { Link, useParams } = ReactRouterDOM

import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { mailService } from "../services/mail.service.js"
import { MailCompose } from '../views/mail-compose.jsx';



export function MailIndex() {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [mails, setMails] = useState([])
    const [isComposeOpen, setIsComposeOpen] = useState(false)


    useEffect(() => {
        // setIsLoading(true)
        loadMails()
    }, [filterBy])

    function loadMails() {
        // setFilterBy(currParams)
        // setIsLoading(false)
        mailService.query(filterBy).then(mailsToUpdate => {
            setMails(mailsToUpdate)
        })
    }



    return <div className="mail-index main-layout">

        <div className="filter-container">
            {/* <MailFilter /> */}
        </div>
        <div className="cmps-container">
            <div className="nav-container">  <MailNav setIsOpen={setIsComposeOpen} /></div>
            <div className="mail-list-container">
                <MailList mails={mails} />
            </div>
            <div className="mail-compose-container">
                {isComposeOpen && <MailCompose setIsOpen={setIsComposeOpen} />}
            </div>
        </div>
    </div>
}

