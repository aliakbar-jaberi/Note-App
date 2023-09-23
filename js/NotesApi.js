export default class NoteAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }
  static saveNote(noteToSave) {
    const notes = NoteAPI.getAllNotes();
    const existedNote = notes.find((n) => n.id == noteToSave.id);
    if (existedNote) {
      existedNote.updated = new Date().toISOString();
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      //title,body =>user id, udated =>app }=> new note!
      notes.push(noteToSave);
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }
  static deleteNote(id) {
    
    const notes = NoteAPI.getAllNotes();
    const filteredNotes = notes.filter((n) => n.id != id);
console.log(filteredNotes);
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}
