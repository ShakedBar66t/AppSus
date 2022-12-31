const { useState, useEffect, Fragment } = React
const { useParams, Link, useNavigate } = ReactRouterDOM

import { showSuccessMsg, showStaredMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail, mailRead }) {
    // console.log(mailRead)
    const navigate = useNavigate()

    const [change, setChange] = useState(true)
    const status = creatStatus()
    const [filteredMails, setFilteredMails] = useState([]);
    // useEffect(() => {
    //     setFilteredMails(filterMailsByIsRead(mails, mail.isRead));
    // }, [mail.isRead]);

    useEffect(() => {
        setChange(!change)
    }, [])

    // function filterMailsByIsRead(mails, isRead) {
    //     return mails.filter(mail => mail.isRead === isRead);
    //   }

    function creatStatus() {
        const params = useParams()
        const values = Object.values(params)
        const param = values[0]
        return param
    }

    if (!status && mail.from === 'user@appsus.com') return /////inbox 
    else if (status === 'sent' && mail.from !== 'user@appsus.com') return ///////sent
    else if (status === 'bin' && !mail.isDeleted) return //////bin
    else if (status === 'starred' && !mail.isStared) return //////stared
    else if (!status && mail.isDeleted || status === 'starred' && mail.isDeleted || status === 'sent' && mail.isDeleted) return ////// deleting the mail

    function changeIsRead() {
        if (!mail.isRead) {
            mail.className = "isRead"
            mail.isRead = true
            mailService.update(mail)
            setChange(!change)
            mailRead(mail.isRead)
        }
        navigate(`/details/${mail.id}`)
    }

    function generalChange(mail, keyToChange) {
        if (keyToChange === 'isRead') {
            (mail.isRead) ? showSuccessMsg('Conversation marked as unread.') : showSuccessMsg('Conversation marked as read.')
            mail[keyToChange] = !mail[keyToChange]
            mailService.update(mail)
            mailRead(!mail.isRead)
            return
        }
        if (keyToChange === 'isDeleted' && mail.isDeleted) {
            showSuccessMsg('Messages have been deleted.')
            mailService.remove(mail.id)
        }
        else if (keyToChange === 'isDeleted') {
            showSuccessMsg('Conversation moved to Bin.')
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
        <td className="sender-img fa fa-user-circle" aria-hidden="true"></td>
        <td onClick={() => generalChange(mail, 'isChecked')} className={(mail.isChecked) ? "check-box icon fa fa-check-square-o" : "check-box icon fa fa-square-o"} ></td>
        <td onClick={() => generalChange(mail, 'isStared')} className={(mail.isStared) ? "star icon fa fa-star " : "star icon fa fa-star-o star-box"}></td>
        <td className="sender" onClick={() => { changeIsRead() }}>
            {getMailSender(mail.from)}</td>
        <td className="subject" onClick={() => { changeIsRead() }}>
            {mail.subject} </td>
        <td className="date" onClick={() => { changeIsRead() }}>
            {mail.sentAt}</td>
        <td onClick={() => generalChange(mail, 'isRead')} className={(mail.isRead) ? "envelope  icon fa fa-envelope-o" : "envelope  icon fa fa-envelope-open-o"}></td>
        <td onClick={() => generalChange(mail, 'isDeleted')} className="trash fa fa-trash"></td>
    </tr >
}
