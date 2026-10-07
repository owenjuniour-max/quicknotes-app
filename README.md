# QuickNotes

QuickNotes is a lightweight, responsive web application that enables users to write, categorize, search, and manage quick everyday notes with instant persistence. Built entirely from scratch using semantic HTML5, modern CSS with Flexbox, and vanilla JavaScript DOM manipulation, the application organizes your thoughts into color-coded category cards and stores them securely inside your browser's localStorage so your notes are never lost across sessions.

## Features

- **Categorized Notes**: Assign each note to Personal, Work, or Study categories, each styled with unique color badges and left borders.
- **Instant Search**: Filter through your notes in real time as you type with instant, case-insensitive keyword searching.
- **Client-Side Validation**: Enforces note character limits (1 to 200 characters) with immediate error feedback.
- **Persistent Storage**: Saves and retrieves all note records using the browser's `localStorage` via JSON serialization.
- **Responsive Design**: Adapts cleanly from large desktop monitors down to mobile phone screens using Flexbox and media queries.
- **Safe DOM Rendering**: Uses `document.createElement` and `textContent` throughout to protect against Cross-Site Scripting (XSS).
- **Dynamic Note Counter**: Accurately tracks total notes with grammatically correct singular and plural messaging.

## How to Run Locally

1. Clone this repository to your local computer:
   ```bash
   git clone https://github.com/owenjuniour-max/quicknotes-app.git
