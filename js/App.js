import NoteAPI from "./NotesApi.js";
import NoteView from "./NoteView.js";

export default class App {
  constructor(root) {
    this.notes = [NoteAPI.getAllNotes()];
    this.activeNote = null;
    this.view = new NoteView(root, this._handlers());
    this._rfreshNotes();
  }
  _rfreshNotes() {
    const notes = NoteAPI.getAllNotes();
    // set Notes
    this.notes = notes;
    this.view.updateNodeList(notes);

    // set Active Note
    this.activeNote = notes[0];
    // this.view.updateActiveNote(this.activeNote);
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: "یاداشت جدید",
          body: "یاداشت...",
        };
        NoteAPI.saveNote(newNote);
        this._rfreshNotes();
        this.activeNote = this.notes[0];
        this.view.updateActiveNote(this.activeNote);
        this.view.updateNotePreviewVisibility(true);
        // console.log("hi note!");
      },
      onNoteEdit: (newTitle, newBody) => {
        NoteAPI.saveNote({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });
        this._rfreshNotes();
        this.view.updateActiveNote(this.activeNote);
        // console.log(newTitle, newBody);
      },
      onNoteSelect: (itemId) => {
        const selectedNote = this.notes.find((n) => n.id == itemId);
        this.view.updateNotePreviewVisibility(true);
        this.view.updateActiveNote(selectedNote);
        this.activeNote = selectedNote;
      },
      onNoteDelete: (itemId) => {
        console.log(itemId);
        NoteAPI.deleteNote(itemId);
        this._rfreshNotes();
        this.activeNote = this.notes[0];
        this.view.updateNotePreviewVisibility(this.notes.length > 0);
        this.view.updateActiveNote(this.activeNote);
      },
    };
  }
}
