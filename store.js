const fs = require('fs')
const util = require('util')
const uuidv1 = require('uuidv1')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)


class Store {
    read(){
        return readFile('db/db.json', 'utf8')
    }
    write(note){
        console.log('line 13' + JSON.stringify(note))
        return writeFile('db/db.json', JSON.stringify(note))

    }
    getNotes(){
        console.log('line 16 inside store.js')
        return this.read().then(notes => {
            console.log(notes)
            let createdNotes
            try {
                createdNotes = [].concat(JSON.parse(notes))
                console.log(createdNotes)
            } catch (error) {
                createdNotes = []

            }
            return createdNotes
        })
    }
    addNote(note){
        console.log(note)
        const {title, text} = note
        if(!title || !text){
            throw new Error('note requires title and text')
        }
        const newNote = {title, text, id:uuidv1()}
        return this.getNotes().then(notes => [...notes, newNote]).then(updatedNotes => this.write(updatedNotes)).then(() => newNote)
    }



}
module.exports = new Store