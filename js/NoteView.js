export default class NoteView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
    <div class="notes__sidebar">
        <div class="notes__logo"><p>NOTE APP</p></div>
        <div class="notes__list">
         
        </div>
        <button class="notes__add">
          <p>یاداشت جدید</p>
        </button>
      </div>
      <div class="notes__preview">
        <input type="text" class="notes__title" placeholder="عنوان ..." />
        <textarea name="" class="notes__body">یاداشت... </textarea>

      </div>
    `;
    const addNoteBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".notes__title");
    const inputBody = this.root.querySelector(".notes__body");
    addNoteBtn.addEventListener("click", () => {
      this.onNoteAdd();
    });

    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener("input", () => {
        // .trim();
        const newBody = inputBody.value
        const newTitle = inputTitle.value

        this.onNoteEdit(newTitle, newBody);
      });
    });
    this.updateNotePreviewVisibility(false);
  }
  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
  _creatLstItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 50;
    return `<div class="notes__list"   >
          <div class="notes__list-item" data-note-id="${id}" >
            <div class="notes__item-header">
            <div class="notes__small-title"> ${title}</div>
            <span class="notes__small-trash" data-note-id="${id}" ><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></span>
            </div>
            <div class="notes__samall-body"> 
            ${body.substring(0, MAX_BODY_LENGTH)}
            ${body.length > MAX_BODY_LENGTH ? "..." : ""}
            </div>
            <div class="notes__samll-updated">${new Date(
              updated
            ).toLocaleString("en", {
              dateStyle: "full",
              timeStyle: "short",
            })}</div>
          </div>`;
  }
  updateNodeList(nodes) {
    const notesContainer = this.root.querySelector(".notes__list");
    // empty notelist
    notesContainer.innerHTML = "";
    let notesList = "";
    for (const node of nodes) {
      const { id, title, body, updated } = node;
      const html = this._creatLstItemHTML(id, title, body, updated);
      notesList += html;
    }
    notesContainer.innerHTML = notesList;
    notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      });
    });

    notesContainer
      .querySelectorAll(".notes__small-trash")
      .forEach((noteItem) => {
        noteItem.addEventListener("click", (e) => {
          e.stopPropagation();
          this.onNoteDelete(noteItem.dataset.noteId);
        });
      });
  }
  updateActiveNote(note) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;
    this.root.querySelectorAll(".notes__list-item").forEach((item) => {
      item.classList.remove("notes__list-item--selected");
    });
   
    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }
}
