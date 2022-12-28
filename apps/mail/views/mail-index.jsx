const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { mailService } from "../services/mail.service.js"


export function MailIndex() {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [mails, setMails] = useState([])
    // const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // setIsLoading(true)
        loadMails()
    }, [filterBy])

    function loadMails() {
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

