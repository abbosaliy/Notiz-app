

const saveTo_localStroge = "hallo";

function getNotes() {
  return JSON.parse(localStorage.getItem(saveTo_localStroge)) || [];
}

function saveNote(title, content, id = undefined) {
  const notes = getNotes();

  if (!id) {
    notes.push({
      title,
      content,
      id: getNextId(),
      lastUpdate: new Date().getTime(),
    });
  } else {
    const indexOfNoteId = notes.findIndex((note) => note.id === id);

    if (indexOfNoteId > -1) {
      notes[indexOfNoteId] = {
        title,
        content,
        id,
        lastUpdate: new Date().getTime(),
      };
    }
  }

  localStorage.setItem(saveTo_localStroge, JSON.stringify(notes));
}

function getNextId() {
  const notes = getNotes();
  const sortedNotes = notes.sort((noteA, noteB) => noteA.id - noteB.id);

  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.id) break;

    nextId = note.id + 1;
  }

  return nextId;
}

function deleteNote(id) {
  if (!id) return;
  const notes = getNotes();
  const filterNotes = notes.filter((note) => note.id !== Number(id));

  localStorage.setItem(saveTo_localStroge, JSON.stringify(filterNotes));
}