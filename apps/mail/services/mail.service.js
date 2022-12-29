

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getNextMailId,
    getPrevMailId,
    addNewMail
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy === 'starred') {
                mails = mails.filter(mail => mail.stared === true)
            }
            // if (filterBy==='') {
            //     mails = mails.filter(mail => mail.listPrice.amount <= filterBy.maxPrice)
            // }
            return mails
        })
}

// const filterby = {
//     status: 'inbox/sent/trash/draft',
//     txt: 'puki', // no need to support complex text search
//     isRead: true, // (optional property, if missing: show all)
//     isStared: true, // (optional property, if missing: show all)
//     lables: ['important', 'romantic'] // has any of the labels
//    }

function get(mailId) {
    console.log(storageService.get(MAIL_KEY, mailId))
    return storageService.get(MAIL_KEY, mailId)
    // return axios.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    console.log(mailId)
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    // if (mail.id) {
    //     return storageService.put(MAIL_KEY, mail) ////// אם יש תשמור
    // } else {
    return storageService.post(MAIL_KEY, mail) //// אם אין תיצור 
    // }
}

function getEmptyMail() {

    return {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isChecked: false,
        isStared: false,
        isDeleted: false,
        sentAt: 1551133930594,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [

            _createMail(),
            _createMail(),
            _createMail(),
            _createMail(),
            _createMail(),
            _createMail(),
            _createMail()
        ]
    }
    utilService.saveToStorage(MAIL_KEY, mails)
}

function _createMail() {
    const mail = getEmptyMail()
    mail.id = utilService.makeId()
    return mail
}

function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            if (idx === mails.length - 1) idx = -1
            return mails[idx + 1].id
        })
}

function getPrevMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            if (idx === 0) idx = mails.length - 1
            return mails[idx - 1].id
        })
}

function addNewMail(recipients, subject, body) {
    const newMail = {
        to: recipients,
        subject,
        body,
        isRead: true,
        isChecked: false,
        isStared: false,
        isDeleted: false,
        sentAt: Date.now(),
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus',
    }
    return storageService.post(MAIL_KEY, newMail)
}

