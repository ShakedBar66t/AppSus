const { useState, useEffect, Fragment } = React
const { Link, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail }) {
    const navigate = useNavigate()

    function changeIsRead() {
        if (!mail.isRead) {
            mail.className = "isRead"
            mail.isRead = !mail.isRead
            mailService.save(mail)
        }
    }

    return <tr className={(mail.isRead) ? "mail-preview read" : "mail-preview"} onClick={() => {
        changeIsRead()
        navigate(`/details/${mail.id}`)
    }
    }>

        <td>
            <input type="checkbox" id="checkbox-1" />
            <label htmlFor="checkbox-1"></label>
        </td>
        <td className="sender">id: {mail.id}</td>
        <td className="subject">Sub:{mail.subject} </td>
        <td className="date">at: {mail.sentAt}</td>

    </tr>


}
