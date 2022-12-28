const { useState, useEffect, Fragment } = React
const { useParams, Link, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail }) {
    const navigate = useNavigate()

    const [change, setChange] = useState()

    function changeIsRead() {
        if (!mail.isRead) {
            mail.className = "isRead"
            mail.isRead = !mail.isRead
            mailService.save(mail)
        }
    }

    function checkBoxChange(mail) {
        mail.isChecked = !mail.isChecked
        mailService.save(mail)
        setChange(!change)
    }

    function staredBoxChange(mail) {
        mail.isStared = !mail.isStared
        mailService.save(mail)
        setChange(!change)
    }

    function createClassName(mail) {
        let className = 'mail-preview '
        className += (mail.isRead) ? 'read ' : ''
        className += (mail.isChecked) ? 'checked' : ''
        return className
    }

    return <tr className={createClassName(mail)} >
        <td >
            <i onClick={() => checkBoxChange(mail)} className={(mail.isChecked) ? "fa fa-check-square-o check-box" : "fa fa-square-o"} aria-hidden="true" > </i>
            <i onClick={() => staredBoxChange(mail)} className={(mail.isStared) ? "fa fa-star" : "fa fa-star-o star-box"}> </i>
        </td>
        <td className="sender" onClick={() => {
            changeIsRead()
            navigate(`/details/${mail.id}`)
        }
        }>id: {mail.id}</td>
        <td className="subject" onClick={() => {
            changeIsRead()
            navigate(`/details/${mail.id}`)
        }
        }>Sub:{mail.subject} </td>
        <td className="date" onClick={() => {
            changeIsRead()
            navigate(`/details/${mail.id}`)
        }
        }>at: {mail.sentAt}</td>

    </tr>


}
