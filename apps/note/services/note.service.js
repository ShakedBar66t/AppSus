import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { mailService } from '../../mail/services/mail.service.js'



const NOTE_KEY = 'notesDB'
_createNotes()

export const noteService = {
    query,
    get,
    getDefaultFilter,
    remove,
    saveNote,
    copyNote,
    pinNote,
    sendAsEmail,
}

function get(noteId){
    return storageService.get(NOTE_KEY, noteId)
}


function sendAsEmail(id){
    getById(id).then((note) => {
        mailService.addNote(note)
    })
}

function pinNote(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find((note) => note.id === noteId)
    const noteIdx = notes.findIndex((note) => note.id === noteId)
    notes.splice(noteIdx, 1)
    if (note.isPin === true) {
        note.isPin = false
        const newNotes = []
        notes.filter((note) => ((note.isPin = true) ? newNotes.push(note) : null))
        newNotes.push(note)
        notes.filter((note) => ((note.isPin = false) ? newNotes.push(note) : null))
        _saveToStorage(newNotes)
        return Promise.resolve(newNotes)
    } else {
        note.isPin = true
        notes.unshift(note)
        _saveToStorage(notes)
        return Promise.resolve(notes)
    }
}


function _update(noteToUpdate) {
    // console.log('update')
    // console.log(noteToUpdate)
    let notes = _loadFromStorage()
    notes = notes.map((note) =>
        note.id === noteToUpdate.id ? noteToUpdate : note
    )
    _saveToStorage(notes)
    return Promise.resolve()
}

function copyNote(noteId) {
    let notes = _loadFromStorage()
    const note = notes.find((note) => note.id === noteId)
    const newNote = Object.assign({}, note)
    newNote.id = utilService.makeId()
    notes.unshift(newNote)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function _add(noteToAdd) {
    let notes = _loadFromStorage()
    const note = noteToAdd
    note.id = utilService.makeId()
    note.isPin = false
    notes.unshift(note)
    _saveToStorage(notes)
    return Promise.resolve()
}

function saveNote(newNote) {
    if (newNote.id) _update(newNote)
    else _add(newNote)
    return Promise.resolve()
}


function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function getDefaultFilter() {
    return { txt: '' }
}

function query() {
    return storageService.query(NOTE_KEY)
}

function _saveToStorage(notes) {
    utilService.saveToStorage(NOTE_KEY, notes)
}

function _loadFromStorage() {
    return utilService.loadFromStorage(NOTE_KEY)
}

function getEmptyNote(){
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                backgroundColor: utilService.getRandomColor(),
                info: {
                    txt: "Fullstack Me Baby!"
                }
            }, {
                id: "n102",
                type: "note-img",
                backgroundColor: utilService.getRandomColor(),
                info: {
                    url: "https://www.w3schools.com/images/w3schools_green.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#00d"
                }
            }, {
                id: "n103",
                type: "note-todos",
                backgroundColor: utilService.getRandomColor(),
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving license", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                }
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}