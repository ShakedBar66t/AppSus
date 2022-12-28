
const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"

export function MailDetails() {

    const { mailId } = useParams()
    console.log(mailId)
    console.log(mailId);
    // loadMail();
    const [mail, setMail] = useState(null)
    const [nextMailId, setNextMailId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('eeee')
        loadMail()
    }, [mailId])

    function loadMail() {
        console.log(mailId)
        mailService.get(mailId)
            .then((mail) => setMail(mail))       /////////////// bug
            .catch((err) => {
                console.log('Had issues in mail details', err)
                showErrorMsg('Cannot load mail')
                navigate('/mail')
            })

        // mailService.getNextMailId(mailId)
        //     .then(setNextMailId)
    }

    if (!mail) return <div>Loading...</div>
    return <div>
        <h1>{mail.id}</h1>
        <h1>{mail.subject}</h1>
        <p>{mail.body}</p>
        <h1>{mail.isRead}</h1>
        <h1>{mail.to}</h1>
    </div>
}