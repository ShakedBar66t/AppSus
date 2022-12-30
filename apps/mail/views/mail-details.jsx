
const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showDeletedMsg, showStaredMsg } from "../../../services/event-bus.service.js"


export function MailDetails() {


    const { mailId } = useParams()
    const [mail, setMail] = useState(null)
    const [change, setChange] = useState(true)
    const [nextMailId, setNextMailId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        // console.log('eeee')
        loadMail()
    }, [mailId])

    function loadMail() {
        console.log(mailId)
        mailService.get(mailId)
            .then((mail) => setMail(mail),)       /////////////// bug
            .catch((err) => {
                console.log('Had issues in mail details', err)
                showErrorMsg('Cannot load mail')
                navigate('/mail')
            })

        // mailService.getNextMailId(mailId)
        //     .then(setNextMailId)
    }

    function generalChange(mail, keyToChange) {
        if (keyToChange === 'isDeleted') {
            mail[keyToChange] = !mail[keyToChange]
            mailService.update(mail)
            setChange(!change)
            showDeletedMsg
        }
        if (keyToChange === 'isStared') {
            debugger
            mail[keyToChange] = !mail[keyToChange]
            mailService.update(mail)
            showStaredMsg
        }
        if (keyToChange === 'isDeleted' && mail.isDeleted) {
            mailService.remove(mail.id)
        }
        if (keyToChange === 'isRead' && mail.isRead) {
            mail.isRead = !mail.isRead
            mailService.update(mail)
            navigate(`/mail/inbox/`)
        }
        setChange(!change)
    }


    if (!mail) return <div>Loading...</div>
    return <div className="mail-details">
        <nav>
            <span className="fa fa-sticky-note-o" onClick={() => console.log('sending the details to notes')}></span>
            <span onClick={() => generalChange(mail, 'isStared')} className={(mail.isStared) ? "star fa fa-star " : "star fa fa-star-o star-box"}></span>
            <span onClick={() => generalChange(mail, 'isRead')} className={(mail.isRead) ? "envelope fa fa-envelope-o" : "envelope fa fa-envelope-open-o"}></span>
            <span onClick={() => generalChange(mail, 'isDeleted')} className="trash fa fa-trash"></span>
        </nav>
        <h1>{mail.id}</h1>
        <h1>{mail.subject}</h1>
        <p>{mail.body}</p>
        <h1>{mail.isRead}</h1>
        <h1>{mail.to}</h1>
    </div>

}