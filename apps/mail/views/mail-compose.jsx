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
        <div className="MailCompose">
            <div className="MailCompose-content">
                <form onSubmit={onSubmitMail}>
                    <button onClick={() => setIsOpen(false)}>X</button>
                    <label htmlFor="vendor"> To: </label>
                    <input
                        type="text"
                        name="to"
                        id="to"
                        placeholder="Recipients"
                        ref={elToRef} />
                    {console.log(elToRef)}
                    <hr />
                    <label htmlFor="vendor">Subject: </label>
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

{/* <form onSubmit={onSubmitFilter}>
    <label htmlFor="vendor">Vendor:</label>
    <input type="text"
        id="vendor"
        name="txt"
        placeholder="By vendor"
        value={filterByToEdit.txt}
        onChange={handleChange}
        ref={elInputRef}
    />

    <label htmlFor="minSpeed">Min speed:</label>
    <input type="number"
        id="minSpeed"
        name="minSpeed"
        placeholder="By min speed"
        value={filterByToEdit.minSpeed}
        onChange={handleChange}
    /> */}