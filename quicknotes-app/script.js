
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const categorySelect = document.getElementById("category-select");
const searchInput = document.getElementById("search-input");
const notesList = document.getElementById("notes-list");
const noteCount = document.getElementById("note-count");
const errorMessage = document.getElementById("error-message");

const STORAGE_KEY = "quicknotes-app-notes";

let notes = loadNotes();

// Load previously saved notes.
function loadNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);

    if (savedNotes === null) {
      return [];
    }

    const parsedNotes = JSON.parse(savedNotes);

    return Array.isArray(parsedNotes) ? parsedNotes : [];
  } catch (error) {
    console.error("Could not load saved notes:", error);
    return [];
  }
}

// Save the current notes array.
function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Could not save notes:", error);
    errorMessage.textContent =
      "Your notes could not be saved in this browser.";
  }
}

// Update the note count using the total number of saved notes.
function updateNoteCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// Render notes according to the current search query.
function renderNotes() {
  notesList.replaceChildren();

  updateNoteCount();

  const query = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(query)
  );

  if (filteredNotes.length === 0) {
    const message = document.createElement("li");
    message.className = "empty-message";

    message.textContent = query
      ? "No notes match your search."
      : "You have no notes yet.";

    notesList.appendChild(message);
    return;
  }

  filteredNotes.forEach((note) => {
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
      note.category.charAt(0).toUpperCase() +
      note.category.slice(1);

    const date = document.createElement("time");
    date.dateTime = note.createdAtISO || "";
    date.textContent = note.createdAt;

    meta.append(category, date);
    content.append(text, meta);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute(
      "aria-label",
      `Delete note: ${note.text}`
    );

    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
    });

    listItem.append(content, deleteButton);
    notesList.appendChild(listItem);
  });
}

// Add a new note.
function addNote(text, category) {
  const now = new Date();

  const note = {
    id: `${Date.now()}-${Math.random()}`,
    text,
    category,
    createdAt: now.toLocaleString(),
    createdAtISO: now.toISOString()
  };

  notes.unshift(note);
  saveNotes();
  renderNotes();
}

// Delete a specific note.
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  renderNotes();
}

// Validate and submit the form.
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const rawText = noteInput.value;
  const text = rawText.trim();
  const category = categorySelect.value;

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    noteInput.focus();
    return;
  }

  if (rawText.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    noteInput.focus();
    return;
  }

  errorMessage.textContent = "";

  addNote(text, category);

  noteInput.value = "";
  noteInput.focus();
});

// Search as the user types.
searchInput.addEventListener("input", renderNotes);

// Show saved notes when the page opens.
renderNotes();
