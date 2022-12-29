const { useState, useEffect, useRef } = React
const { Link, useParams } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { mailService } from "../services/mail.service.js"


export function MailIndex() {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [mails, setMails] = useState([])

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
        <div className="cmps-container">

            <MailNav />
            <MailList mails={mails} />
        </div>
    </div>
}

