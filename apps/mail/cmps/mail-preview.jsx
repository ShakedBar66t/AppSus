const { useState, useEffect, Fragment } = React
const { useParams, Link, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail }) {
    const navigate = useNavigate()

    const [change, setChange] = useState(true)
    const status = creatStatus()

    function creatStatus() {
        const params = useParams()
        const values = Object.values(params)
        const param = values[0]
        return param
    }

    // console.log('from', mail.from=== mail.from === 'user@appsus.com')
    if (!status && mail.from === 'user@appsus.com') return /////inbox
    if (!status && mail.isDeleted || status === 'starred' && mail.isDeleted || status === 'sent' && mail.isDeleted) return ////// deleting the mail
    if (status === 'sent' && !mail.to === 'user@appsus.com') return
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
        if (keyToChange === 'isDeleted' && mail.isDeleted) {
            mailService.remove(mail.id)
        }
        mail[keyToChange] = !mail[keyToChange]
        mailService.update(mail)
        setChange(!change)
    }

    function createClassName(mail) {
        let className = 'mail-preview '
        className += (mail.isRead) ? 'read ' : ''
        className += (mail.isChecked) ? 'checked' : ''
        if (mail.isStared) {
            className += ' star-icon'
        }
        return className
    }

    function getMailSender(string) {
        let words = string.split(' ')
        for (let i = 0; i < words.length; i++) {
            if (words[i].includes('@')) {
                if (i > 0) {
                    return words[i - 1]
                }
            }
        }
        return
    }

    return <tr className={createClassName(mail)} >
        <td onClick={() => generalChange(mail, 'isChecked')} className={(mail.isChecked) ? "fa fa-check-square-o" : "fa fa-square-o"} ></td>
        <td onClick={() => generalChange(mail, 'isStared')} className={(mail.isStared) ? "star fa fa-star " : "star fa fa-star-o star-box"}></td>
        <td className="sender" onClick={() => { changeIsRead(), navigate(`/details/${mail.id}`) }}>
            {getMailSender(mail.from)}</td>
        <td className="subject" onClick={() => { changeIsRead(), navigate(`/details/${mail.id}`) }}>
            {mail.subject} </td>
        <td className="date" onClick={() => { changeIsRead(), navigate(`/details/${mail.id}`) }}>
            {mail.sentAt}</td>
        <td onClick={() => generalChange(mail, 'isRead')} className={(mail.isRead) ? "envelope fa fa-envelope-o" : "envelope fa fa-envelope-open-o"}></td>
        <td onClick={() => generalChange(mail, 'isDeleted')} className="trash fa fa-trash"></td>
    </tr >
}
