

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_creatMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getNextMailId,
    getPrevMailId
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(MAIL_KEY)
    // .then(mails => {
    //     if (filterBy.txt) {
    //         const regex = new RegExp(filterBy.txt, 'i')
    //         mails = mails.filter(mail => regex.test(mail.title))
    //     }
    //     if (filterBy.maxPrice) {
    //         mails = mails.filter(mail => mail.listPrice.amount <= filterBy.maxPrice)
    //     }
    //     return mails
    // })
}

function get(mailId) {
    // debugger
    console.log(storageService.get(MAIL_KEY, mailId))
    return storageService.get(MAIL_KEY, mailId)
    // return axios.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail) ////// אם יש תשמור
    } else {
        return storageService.post(MAIL_KEY, mail) //// אם אין תיצור 
    }
}

function getEmptyMail(title = '', amount = '') {

    return {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

function _creatMails() {
<<<<<<< HEAD
    // debugger
=======
>>>>>>> origin/main
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

function _createMail(title, listPrice = 250) {
    const mail = getEmptyMail(title, listPrice)
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