

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
    getUnreadCount,
    getDefaultFilter,
    getNextMailId,
    getPrevMailId,
    addNewMail,
    update,
    addNote
}

/////////// הוספה של שקד

function addNote(note) {
    let emails = loadFromStorage()
    const newEmail = note
    newEmail.id = utilService.makeId()
    newEmail.body = newEmail.info.txt
    newEmail.from = { fullName: 'from note', email: 'note@appsus.co' }
    newEmail.isPin = false
    newEmail.status = 'inbox'
    newEmail.isRead = false
    newEmail.sentAt = new Date()
    emails.unshift(newEmail)
    saveToStorage(emails)
}

/////////////

function query(filterBy = getDefaultFilter()) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            mails = mails.filter(mail => mail.body.includes(filterBy.txt));
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead)
            }
            else if ((filterBy.isRead === null)) mails = mails.filter(mail => mail.body.includes(filterBy.txt));
            else if (filterBy.isRead === false) {
                mails = mails.filter(mail => !mail.isRead)
            }
            return mails;
        });
}


function getUnreadCount() {
    return mailService.query().then(mails => {
        return mails.reduce((unreadCount, mail) => {
            if (mail.isRead || mail.isDeleted || mail.from === 'user@appsus.com') {
                return unreadCount;
            } else {
                return unreadCount + 1;
            }
        }, 0);
    });
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
    // return axios.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    // console.log(mailId)
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    return storageService.post(MAIL_KEY, mail) //// אם אין תיצור 
}

function update(mail) {
    return storageService.put(MAIL_KEY, mail) //// אם יש תעדכן 
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
    return { txt: '' }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: utilService.makeId(),
                to: 'user@appsus.com',
                subject: 'test',
                body: 'big test',
                isRead: false,
                isChecked: false,
                isStared: false,
                isDeleted: false,
                sentAt: `08:43`,
                from: 'Dropbox @dropbox.com',
                fullname: 'Mahatma Appsus',
            },
            {
                id: utilService.makeId(),
                to: `haim@appsus.com`,
                subject: 'Itai, נשארו רק עוד יומיים לקבל בחזרה עד 400 ₪! ⌛',
                body: 'big test',
                isRead: true,
                isChecked: false,
                isStared: false,
                isDeleted: false,
                sentAt: `28 Dec`,
                from: 'user@appsus.com',
                fullname: 'Mahatma Appsus',
            },
            {
                id: utilService.makeId(),
                to: `1usver@appsus.com`,
                subject: '[Slack] New messages from Avi Isakov - Coding Academy and Shaked Barsheshet in Coding Academy - NOV 22',
                body: `You have a new mention in Coding Academy - NOV 22 (codingacademybootcamp.slack.com),
                From your conversation with Avi Isakov - Coding Academy and Shaked Barsheshet`  ,
                isRead: false,
                isChecked: false,
                isStared: false,
                isDeleted: false,
                sentAt: `28 Dec`,
                from: 'Slack @slack.com',
                fullname: 'Mahatma Appsus',
            },
            {
                id: utilService.makeId(),
                to: `user@appsus.com`,
                subject: '[Slack] New messages from Avi Isakov - Coding Academy and Shaked Barsheshet in Coding Academy - NOV 22',
                body: `You have a new mention in Coding Academy - NOV 22 (codingacademybootcamp.slack.com),
                From your conversation with Avi Isakov - Coding Academy and Shaked Barsheshet`  ,
                isRead: false,
                isChecked: false,
                isStared: false,
                isDeleted: false,
                sentAt: `22 Dec`,
                from: 'Slack @slack.com',
                fullname: 'Mahatma Appsus',
            },
            {
                id: utilService.makeId(),
                to: `user@appsus.com`,
                subject: 'החשבון שלך בתשלומי החנייה',
                body: 'big test',
                isRead: true,
                isChecked: false,
                isStared: false,
                isDeleted: false,
                sentAt: `15 Dec`,
                from: 'Pango @pango.com',
                fullname: 'Mahatma Appsus',
            },
            {
                id: utilService.makeId(),
                to: `user@appsus.com`,
                subject: 'הזמנתך מוכנה לאיסוף בסניף נוף הגליל (נצרת עילית)',
                body: `לקוח יקר, הזמנתך מס' 16321516 מוכנה לאיסוף בסניף נוף הגליל (נצרת עילית) בכתובת דרך החטיבות 15 (פתח ב-Waze | פתח ב-Google Maps).

                לתשומת לבך - לצורך האיסוף יש להציג ת.ז ישראלית או רישיון נהיגה של בעל כרטיס האשראי. כמו כן תעודת הזיהוי של אוסף ההזמנה תצולם במעמד האיסוף.

                מומלץ מאוד להזמין תור לאיסוף הזמנתך בקישור הבא: https://ksp.co.il/q/page/tor_app_schedule.php?token=6bfd2f498d919769909a0bd02e518f6d הזמנת תור איננה חובה, אך מומלצת מאוד ועשויה לקצר זמני המתנה משמעותיים

                מספר החשבונית המשויכת להזמנתך: 219990 (אנא הצג מספר זה בסניף לצורך איתור ההזמנה).

                שעות הפעילות הינן: ימי א'-ה': 10:00-19:00
                ימי ו': 09:30-14:00
                קומה שנייה (בפועל זו קומה מספר 1), מול המשביר לצרכן

                דרכי יצירת קשר
                פנייה לשירות לקוחות
                פקס: 04-8500-850`,
                isRead: false,
                isChecked: false,
                isStared: true,
                isDeleted: false,
                sentAt: `11 Dec`,
                from: 'KSP.co.il @ksp.co.il',
                fullname: 'Mahatma Appsus',
            },
            {
                id: utilService.makeId(),
                to: `user@appsus.com`,
                subject: 'הזמנתך מוכנה לאיסוף בסניף קריון ק.ביאליק',
                body: `לקוח יקר, הזמנתך מס' 16060923 מוכנה לאיסוף בסניף קריון ק.ביאליק בכתובת דרך עכו 192 קרית ביאליק (פתח ב-Waze | פתח ב-Google Maps).

                לתשומת לבך - לצורך האיסוף יש להציג ת.ז ישראלית או רישיון נהיגה של בעל כרטיס האשראי. כמו כן תעודת הזיהוי של אוסף ההזמנה תצולם במעמד האיסוף.

                מומלץ מאוד להזמין תור לאיסוף הזמנתך בקישור הבא: https://ksp.co.il/q/page/tor_app_schedule.php?token=04f373a4c702a854b25b98e861f2ce3f הזמנת תור איננה חובה, אך מומלצת מאוד ועשויה לקצר זמני המתנה משמעותיים

                מספר החשבונית המשויכת להזמנתך: 398329 (אנא הצג מספר זה בסניף לצורך איתור ההזמנה).

                שעות הפעילות הינן: ימי א'-ה': 10:00-19:00
                ימי ו': 09:00-14:00
                קריון שער 3

                דרכי יצירת קשר
                פנייה לשירות לקוחות
                פקס: 04-8500-850`,
                isRead: true,
                isChecked: false,
                isStared: true,
                isDeleted: false,
                sentAt: `11 Dec`,
                from: 'KSP.co.il @ksp.co.il',
                fullname: 'Mahatma Appsus',
            },
            {
                id: utilService.makeId(),
                to: `user@appsus.com`,
                subject: 'test',
                body: 'big test',
                isRead: true,
                isChecked: false,
                isStared: false,
                isDeleted: false,
                sentAt: `3 Dec`,
                from: 'user@appsus.com',
                fullname: 'Mahatma Appsus',
            },
            {
                id: utilService.makeId(),
                to: `user@appsus.com`,
                subject: 'Planning a big trip in 2023? Start here.',
                body: `Make that big trip happen. To kick-start your planning, we’ve got the best places to go right now.
                 From laid-back beaches to buzzing cities, there’s something for everyone. Plus, tips for where to stay, things to do, and more.`,
                isRead: false,
                isChecked: false,
                isStared: false,
                isDeleted: false,
                sentAt: `28 Nov`,
                from: 'Tripadvisor @mp1.tripadvisor.com',
                fullname: 'Mahatma Appsus',
            },
            {
                id: utilService.makeId(),
                to: `user@appsus.com`,
                subject: 'Tommy and 40 others made changes in your shared folders',
                body: 'big test',
                isRead: true,
                isChecked: false,
                isStared: false,
                isDeleted: false,
                sentAt: `16 Nov`,
                from: 'Slack @slack.com>',
                fullname: 'Mahatma Appsus',
            },
            {
                id: utilService.makeId(),
                to: `user@appsus.com`,
                subject: '[Slack] New messages from Inbal Avidov and Tommy Irmia - Coding Academy in Coding Academy - NOV 22',
                body: 'big test',
                isRead: true,
                isChecked: false,
                isStared: false,
                isDeleted: false,
                sentAt: `29 Oct`,
                from: 'Slack @slack.com>',
                fullname: 'Mahatma Appsus',
            },
            {
                id: utilService.makeId(),
                to: `user@appsus.com`,
                subject: 'מרגישים את הרומנטיקה באוויר? (פרסומת)',
                body: `לאחר טעינת הקוד באיזור האישי בוולט

                חפשו גלידת שטראוס ותוכלו להינות מההטבה
                
                לקבלת 20 ₪
                מתנה >>
                *לרכישה בחנות גלידת שטראוס בוולט, למימוש עד ליום 31.12.22.
                
                **המשלוח באחריות וולט, ולפי תנאי המשלוח באתר וולט.
                
                הודעה זו נשלחה ע"י strauss@mailing.unilever.co.il,
                הודעה זו נשלחה אליכם מאחר והסכמתם לקבל הודעות שיווקיות מקבוצת חברות יוניליוור ישראל.
                אם אינכם מעוניינים להמשיך לקבל הודעות באפשרותכם לבצע הסרה מרשימת התפוצה.
                למידע נוסף אתם מוזמנים לקרוא עוד על תנאי הפרטיות שלנו.
                קבוצת יוניליוור ישראל | גלבוע 3 | קרית שדה התעופה | 7019900 | Israel | 1-800-780-780 https://www.unilever.co.il/ | כתובת המייל שלנו לפניות-Strauss.Icecream@unilever.com
                
                `,
                isRead: false,
                isChecked: false,
                isStared: false,
                isDeleted: false,
                sentAt: `22 Oct`,
                from: 'StraussIL @mailing.unilever.co.il>',
                fullname: 'Mahatma Appsus',
            },

        ]
    }
    utilService.saveToStorage(MAIL_KEY, mails)
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
        sentAt: _getTimeString(),
        from: 'user@appsus.com',
        fullname: 'Mahatma Appsus',
    }
    return storageService.post(MAIL_KEY, newMail)
}

function _getTimeString() {
    const date = new Date(Date.now());
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}