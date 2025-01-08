const notesListeEl = document.querySelector(".new-notes");
const clickSaveButtonEl = document.querySelector(".save-button");
const titleInputEl = document.querySelector(".titleInput-button");
const createNewNotesEl = document.querySelector(".create_new-notes");
const deleteNotesEl = document.querySelector(".delete-button");
const contentEl = document.querySelector(".content-title");
const likeEl = document.querySelectorAll("like-icon");

clickSaveButtonEl.addEventListener("click", clickSaveButton);
createNewNotesEl.addEventListener("click", createNewNotes);
deleteNotesEl.addEventListener("click", clickDeleteButtonEl);

displayNotesListe();
applyListeners();

function applyListeners() {
  const contentNotesEl = document.querySelectorAll(".new-notes-content");

  contentNotesEl.forEach((contentNotes) => {
    contentNotes.addEventListener("click", () =>
      selectedNote(contentNotes.getAttribute("data-id"))
    );
  });
}

function displayNotesListe() {
  const notes = getNotes();

  const sortedNotes = notes.sort(
    (NoteA, NoteB) => NoteB.lastUpdate - NoteA.lastUpdate
  );

  let html = "";

  sortedNotes.forEach((note) => {
    html += `
    <div class="new-notes-content" data-id="${note.id}">
      <div class="like-icon">
        <svg
          class="like-icon-button"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class"size:6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </div>
      <div class="notes-data">
        <div class="note-title">${escapeHtml(note.title)}</div>
        <div class="note-content">${escapeHtml(note.content)}</div>
        <div class="note-data">${new Date(note.lastUpdate).toLocaleString(
          "de-DE"
        )}</div>
      </div>
    </div>
    `;
  });

  notesListeEl.innerHTML = html;

  
}


notesListeEl.addEventListener("click", (event) => {
  if (event.target.closest(".like-icon-button")) {
    const likeIconButton = event.target.closest(".like-icon-button");

    if (likeIconButton.style.fill === "red") {
      console.log(likeIconButton.style.fill);

      likeIconButton.style.fill = "none";
    } else {
      likeIconButton.style.fill = "red";
    }
  }
});


function clickSaveButton() {
  const title = titleInputEl.value;
  const content = contentEl.value;

  if (!title || !content) {
    alert("Bitte Title und Inhalt eingeben!");

    return;
  }

  saveNote(title, content, Number(getcurrentlyselectedNoteId()));

  titleInputEl.value = "";
  contentEl.value = "";

  displayNotesListe();
  applyListeners();
}

function selectedNote(id) {
  const selectedNoteEl = document.querySelector(
    `.new-notes-content[data-id = "${id}"]`
  );

  if (selectedNoteEl.classList.contains("selected-note")) return;

  removeSelectedNote();
  selectedNoteEl.classList.add("selected-note");

  const notes = getNotes();
  const selectedNote = notes.find((note) => note.id === Number(id));
  if (!selectedNote) return;

  titleInputEl.value = selectedNote.title;
  contentEl.value = selectedNote.content;
}

function removeSelectedNote() {
  const newNotesEl = document.querySelectorAll(".new-notes-content");

  newNotesEl.forEach((noteEl) => {
    noteEl.classList.remove("selected-note");
  });
}

function createNewNotes() {
  titleInputEl.value = "";
  contentEl.value = "";
  removeSelectedNote();
}

function getcurrentlyselectedNoteId() {
  let currentId = undefined;

  const currentlyselectedNoteEl = document.querySelector(".selected-note");
  if (currentlyselectedNoteEl) {
    currentId = currentlyselectedNoteEl.getAttribute("data-id");
  }

  return currentId;
}

function clickDeleteButtonEl() {
  const currentlyselectedNoteId = getcurrentlyselectedNoteId();

  if (!currentlyselectedNoteId) return;

  deleteNote(currentlyselectedNoteId);

  titleInputEl.value = "";
  contentEl.value = "";

  displayNotesListe();
  applyListeners();
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
