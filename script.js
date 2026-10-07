// ============================================================
// QuickNotes Application Script (script.js)
// ============================================================

// 1. Elements Selected with querySelector
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const STORAGE_KEY = "quicknotes_app_notes";

// 2. Notes State (Loaded from localStorage)
let notes = loadNotes();

/**
 * Loads notes from localStorage with JSON.parse
 */
function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch (err) {
    return [];
  }
}

/**
 * Saves notes to localStorage with JSON.stringify
 */
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/**
 * Updates the note count paragraph based on total notes
 */
function updateNoteCount() {
  const total = notes.length;
  if (total === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (total === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${total} notes.`;
  }
}

/**
 * Renders notes list using createElement and textContent (safe against XSS)
 */
function render() {
  updateNoteCount();

  // Clear existing list elements
  while (notesList.firstChild) {
    notesList.removeChild(notesList.firstChild);
  }

  // Filter notes by search keyword
  const query = searchInput.value.trim().toLowerCase();
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(query)
  );

  // If search query is present and no notes match
  if (query !== "" && filteredNotes.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-message";
    emptyItem.textContent = "No notes match your search.";
    notesList.appendChild(emptyItem);
    return;
  }

  // Render each note card
  filteredNotes.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category}`;

    // Top header row: Category badge and CreatedAt date
    const headerDiv = document.createElement("div");
    headerDiv.className = "note-header";

    const badgeSpan = document.createElement("span");
    badgeSpan.className = "category-badge";
    badgeSpan.textContent = note.category;

    const dateSpan = document.createElement("span");
    dateSpan.className = "note-date";
    dateSpan.textContent = note.createdAt;

    headerDiv.appendChild(badgeSpan);
    headerDiv.appendChild(dateSpan);

    // Note Text (using textContent for security)
    const textP = document.createElement("p");
    textP.className = "note-text";
    textP.textContent = note.text;

    // Actions row: Delete Button
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "note-actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteNote(note.id);
    });

    actionsDiv.appendChild(deleteBtn);

    // Assemble note card
    li.appendChild(headerDiv);
    li.appendChild(textP);
    li.appendChild(actionsDiv);

    notesList.appendChild(li);
  });
}

/**
 * Adds a new note with validation
 */
function addNote(event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validation 1: Empty note
  if (text.length === 0) {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // Validation 2: Max 200 characters
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear validation error on successful addition
  errorMessage.textContent = "";

  // Create note object
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };

  // Prepend note to array, save, clear input and re-render
  notes.unshift(newNote);
  saveNotes();
  noteInput.value = "";
  render();
}

/**
 * Deletes a note by unique id
 */
function deleteNote(id) {
  notes = notes.filter((n) => n.id !== id);
  saveNotes();
  render();
}

// Event Listeners
noteForm.addEventListener("submit", addNote);
searchInput.addEventListener("input", render);

// Initial Render on page load
render();
