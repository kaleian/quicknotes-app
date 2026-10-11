
# QuickNotes

QuickNotes is a simple note-taking web application built with HTML, CSS, and JavaScript. It helps users organize notes into Personal, Work, and Study categories.

## Features

- Add notes with a category.
- Display each note with its category and creation date.
- Validate empty notes and notes exceeding 200 characters.
- Delete individual notes.
- Search notes using case-insensitive text matching.
- Save notes in localStorage so they remain after refreshing the page.
- Display the total number of saved notes.
- Responsive layout for mobile and desktop screens.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Browser localStorage

## Getting Started

1. Clone the repository or download the project.
2. Open the `quicknotes-app` folder.
3. Open `index.html` in a browser, or use the Live Server extension in VS Code.

## How to Use

1. Enter your note in the text field.
2. Select Personal, Work, or Study.
3. Click **Add Note**.
4. Use the search field to find notes.
5. Click **Delete** to remove a note.

Notes are saved in the browser's localStorage. They are not automatically synchronized between browsers or devices.

## Project Structure

```text
quicknotes-app/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Author

Created as a web development learning project by Ian Kale.
