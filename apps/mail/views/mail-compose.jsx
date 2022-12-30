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
                <div className="new-message">New Message <button className="close-compose  fa fa-times" onClick={() => setIsOpen(false)}></button></div>
                <form className="compose-form" onSubmit={onSubmitMail}>
                    <div className="input-container flex">
                        <label htmlFor="to"> To: </label>
                        <input
                            className="to-input"
                            type="email"
                            name="to"
                            id="to"
                            placeholder="Recipients"
                            ref={elToRef} />
                    </div>
                    <hr />
                    <div className="input-container flex">
                        <label htmlFor="subject">Subject: </label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            placeholder="Subject"
                            ref={elSubjectRef} />
                    </div>
                    <hr />
                    <textarea className="compose-text"
                        name="body"
                        ref={elTextRef}
                    />
                    <hr />
                    <div className="btn-container flex">
                        <button className="send-btn" type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
