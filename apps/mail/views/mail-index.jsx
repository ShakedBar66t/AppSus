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
        // console.log('from use effec ', filterBy)
    }, [filterBy])

    function loadMails() {
        // console.log(filterBy)
        // setIsLoading(false)
        mailService.query(filterBy).then(mailsToUpdate => {
            // console.log(mailsToUpdate)
            setMails(mailsToUpdate)
        })
    }

    return <div className="mail-index">
        <MailNav />
        <MailList mails={mails} />
    </div>
}

