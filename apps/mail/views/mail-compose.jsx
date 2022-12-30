const { useState, Fragment, useRef } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"


export function MailCompose({ setIsOpen }) {

    const navigate = useNavigate()

    const elToRef = useRef(null)
    const elSubjectRef = useRef(null)
    const elTextRef = useRef(null)


    function onSubmitMail(ev) {
        ev.preventDefault()
        const newMail = mailService.addNewMail(elToRef.current.value, elSubjectRef.current.value, elTextRef.current.value)
        setIsOpen(false)
    }

    return (
        <div className="mail-compose">
            <div className="mail-compose-content">
                <form onSubmit={onSubmitMail}>
                    <button onClick={() => setIsOpen(false)}>X</button>
                    <label htmlFor="to"> To: </label>
                    <input
                        type="email"
                        name="to"
                        id="to"
                        placeholder="Recipients"
                        ref={elToRef} />
                    <hr />
                    <label htmlFor="subject">Subject: </label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                        ref={elSubjectRef} />
                    <hr />
                    <textarea name="body"
                        ref={elTextRef}
                    />
                    <button type="submit">Send</button>
                    <button onClick={() => { setIsOpen(false) }}>Cancel</button>
                </form>
            </div>
        </div>
    )
}
