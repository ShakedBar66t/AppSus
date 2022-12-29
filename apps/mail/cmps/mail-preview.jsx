const { useState, useEffect, Fragment } = React
const { useParams, Link, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail }) {
    const navigate = useNavigate()

    const [change, setChange] = useState()
    const status = creatStatus()

    function creatStatus() {
        const params = useParams()
        const values = Object.values(params)
        const param = values[0]
        return param
    }

    if (!status && mail.isDeleted) return
    if (status === 'bin' && !mail.isDeleted) return
    if (status === 'starred' && !mail.isStared) return

    function changeIsRead() {
        if (!mail.isRead) {
            mail.className = "isRead"
            mail.isRead = !mail.isRead
            mailService.save(mail)
            setChange(!change)
        }
    }

    function generalChange(mail, keyToChange) {
        if (keyToChange === 'isDeleted' && status === 'bin') {
            console.log('removing ', mail.id)
            mailService.remove(mail.id)
        }
        mail[keyToChange] = !mail[keyToChange]
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
        <td onClick={() => generalChange(mail, 'isChecked')} className={(mail.isChecked) ? "fa fa-check-square-o check-box" : "fa fa-square-o"} ></td>
        <td onClick={() => generalChange(mail, 'isStared')} className={(mail.isStared) ? "fa fa-star" : "fa fa-star-o star-box"}></td>
        <td className="sender" onClick={() => { changeIsRead(), navigate(`/details/${mail.id}`) }}>
            id: {mail.id}</td>
        <td className="subject" onClick={() => { changeIsRead(), navigate(`/details/${mail.id}`) }}>
            Sub:{mail.subject} </td>
        <td className="date" onClick={() => { changeIsRead(), navigate(`/details/${mail.id}`) }}>
            at: {mail.sentAt}</td>
        <td onClick={() => generalChange(mail, 'isRead')} className={(mail.isRead) ? "fa fa-envelope-o" : "fa fa-envelope-open-o"}></td>
        <td onClick={() => generalChange(mail, 'isDeleted')} className="fa fa-trash"></td>
    </tr >
}
