
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const categorySelect = document.getElementById("category-select");
const notesList = document.getElementById("notes-list");
const noteCount = document.getElementById("note-count");
const errorMessage = document.getElementById("error-message");

let notes = [];

function renderNotes() {
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const listItem = document.createElement("li");
    listItem.className = `note-card category-${note.category}`;

    const content = document.createElement("div");
    content.className = "note-content";

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const category = document.createElement("span");
    category.className = "category-label";
    category.textContent =
      note.category.charAt(0).toUpperCase() + note.category.slice(1);

    const date = document.createElement("time");
    date.textContent = note.createdAt;

    meta.append(category, date);
    content.append(text, meta);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
    });

    listItem.append(content, deleteButton);
    notesList.appendChild(listItem);
  });

  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function addNote(text, category) {
  const note = {
    id: Date.now(),
    text,
    category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);
  renderNotes();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  renderNotes();
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = categorySelect.value;

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (noteInput.value.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  addNote(text, category);
  noteInput.value = "";
  errorMessage.textContent = "";
  noteInput.focus();
});

renderNotes();
