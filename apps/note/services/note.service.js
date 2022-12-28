import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'



const NOTE_KEY = 'notesDB'
_createNotes()

export const noteService = {
    query,
    getDefaultFilter
}

function getDefaultFilter() {
    return { txt: ''}
  }

function query(){
    return storageService.query(NOTE_KEY)
}

function _saveToStorage(notes){
    utilService.saveToStorage(NOTE_KEY, notes)
}

function _loadFromStorage(){
    return utilService.loadFromStorage(NOTE_KEY)
}

function _createNotes(){
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length){
        notes = [
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                backgroundColor: utilService.getRandomColor(),
                info: {
                    txt: "Fullstack Me Baby!"
                }
            },{
                id: "n102",
                type: "note-img",
                backgroundColor: utilService.getRandomColor(),
                info: {
                    url: "http://some-img/me",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },{
                id:"n103",
                type: "note-todos",
                backgroundColor: utilService.getRandomColor(),
                info: {
                    label: "Get my stuff together",
                    todos:[
                        {txt: "Driving license", doneAt: null},
                        { txt: "Coding power", doneAt: 187111111}
                    ]
                }
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}