import { utilService } from './utilService.js'

const NOTE_KEY = 'notesDB'

export const noteSevice = {
    query,
}

function query(){
    let notes = _loadFromStorage()
    if (!notes) {
        notes = _createNotes()
        _saveToStorage(notes)
    }
    return Promise.resolve(notes)
}

function _saveToStorage(notes){
    storageService.saveToStorage(NOTE_KEY, notes)
}

function _loadFromStorage(){
    return storageService.loadFromStorage(NOTE_KEY)
}

function _createNotes(){
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length){
        notes = [
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                }
            },{
                id: "n102",
                type: "note-img",
                info: {
                    url: "http://some-img/me",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },{
                
            }
        ]
    }
}