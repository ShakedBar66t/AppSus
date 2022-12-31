
const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showSuccessMsg, showStaredMsg } from "../../../services/event-bus.service.js"
import { MailNav } from "../cmps/mail-nav.jsx"


export function MailDetails() {
    const { mailId } = useParams()
    const [mail, setMail] = useState(null)
    const [change, setChange] = useState(true)
    const [nextMailId, setNextMailId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then((mail) => setMail(mail),)
            .catch((err) => {
                console.log('Had issues in mail details', err)
                showErrorMsg('Cannot load mail')
                navigate('/mail')
            })
    }

    function generalChange(mail, keyToChange) {

        if (keyToChange === 'isDeleted') {
            showSuccessMsg('Conversation moved to Bin.')
            mail[keyToChange] = !mail[keyToChange]
            mailService.update(mail)
            setChange(!change)
            navigate(`/mail/inbox/`)
        }
        if (keyToChange === 'isStared') {
            (mail.isStared) ? showSuccessMsg('Conversation starred.') : showSuccessMsg('Conversation unstarred.')
            mail[keyToChange] = !mail[keyToChange]
            mailService.update(mail)
        }
        if (keyToChange === 'isDeleted' && mail.isDeleted) {
            mailService.remove(mail.id)
        }
        if (keyToChange === 'isRead') {
            mail.isRead = false
            showSuccessMsg('Conversation marked as unread.')
            console.log(mail.isRead)
            mailService.update(mail)
            navigate(`/mail/inbox/`)
        }
        setChange(!change)
    }


    if (!mail) return <div>Loading...</div>
    return <div className=" cmps-container">
        <div className="nav-container">

            <MailNav />
        </div>
        <div className="mail-details">
            <div className="details-header-container">
                <nav>
                    <span className="back-btn fa fa-arrow-left" onClick={() => navigate(`/mail/inbox/`)}></span>

                    <span className="fa fa-sticky-note-o" onClick={() => console.log('sending the details to notes')}></span>
                    <span onClick={() => generalChange(mail, 'isStared')} className={(mail.isStared) ? "star fa fa-star " : "star fa fa-star-o star-box"}></span>
                    <span onClick={() => generalChange(mail, 'isRead')} className={(mail.isRead) ? "envelope fa fa-envelope-o" : "envelope fa fa-envelope-open-o"}></span>
                    <span onClick={() => generalChange(mail, 'isDeleted')} className="trash fa fa-trash"></span>
                </nav>
                <hr />
                {/* <h1>{mail.id}</h1> */}
                <h1>{mail.subject}</h1>
                <hr />
                <h1><span className="fa fa-user-circle"></span>{mail.from}</h1>
                <hr />
            </div>
            <div className="detail-body">
                <p >{mail.body}</p>
                {/* <h1>{mail.isRead}</h1> */}
            </div>
        </div>
    </div>

}