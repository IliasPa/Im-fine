<img src="image.png" alt="I'm fine" width="72">

# I'm fine — v0.0

A personal mood tracking app that runs locally in the browser. Log how you feel each day, review your history, and visualise patterns over time with a colour heatmap.

---

## Running the app

Double-click **`start.command`** in Finder.

This opens a Terminal window, starts the server, and launches the app at `http://localhost:3000`.

To stop the server, close the Terminal window or press `Ctrl+C`.

> **First time only:** macOS may block the file. Right-click → Open to bypass Gatekeeper.

Alternatively, from the terminal:

```bash
node server.js
```

No dependencies. Requires Node.js (built-in modules only).

---

## Features

### Log tab

- Select a mood from a 5-level scale: Awful, Bad, Okay, Good, Great
- Tag what influenced your mood (Work, Family, Friends, Food, Boyfriend, Sleep, Exercise, Weather, Stress, Social)
- Add an optional free-text note
- The three most recent entries are shown below the form

### History tab

- All entries listed newest first
- Each entry shows the mood, date, time of day (Morning / Afternoon / Evening / Night), tags, and note
- Summary stats at the top: average mood (1–5), total entries, most frequent tag

### Heatmap tab

- **Month view** — calendar grid for any month, each day coloured by mood
- **Year view** — compact 12-month overview for any year
- Navigate backwards and forwards with the arrow buttons
- Hover over any day to see a tooltip with all entries for that day: mood, time of day, tags, and note
- Days with no entry are shown in a neutral grey

### Settings (gear icon)

- **Theme** — Light or Dark mode
- **Moods** — change the icon and colour for each of the 5 mood levels; the heatmap and history update instantly
- **Tags** — add or remove tags that appear in the log form
- **Reset to defaults** — restores the original icons, colours, and tags

---

## Data

All entries are stored in **`data.json`** in the same folder. The file is updated live every time an entry is saved. You can open it in any text editor to inspect or edit entries manually.

Each entry has the shape:

```json
{
  "id": 1779331916531,
  "ts": "2026-05-21T02:51:56.531Z",
  "mood": 4,
  "tags": ["Food", "Boyfriend"],
  "note": ""
}
```

Mood values: `0` Awful · `1` Bad · `2` Okay · `3` Good · `4` Great

Settings (theme, custom mood colours/icons, custom tags) are saved in the browser's `localStorage` and are not part of `data.json`.

---

## File structure

```
v0.0/
├── index.html              # App markup and JavaScript
├── styles.css              # All styles (light + dark mode)
├── server.js               # Local HTTP server (no dependencies)
├── data.json               # Entry storage
├── start.command           # Double-click to launch
└── mood_journal_mockup.html  # Original design mockup
```

---

## Server API

The server runs on port `3000` and exposes three endpoints used internally by the app.

| Method   | Path                   | Description                                      |
| -------- | ---------------------- | ------------------------------------------------ |
| `GET`    | `/api/entries`         | Return all entries as a JSON array               |
| `POST`   | `/api/entries`         | Append a new entry; returns the updated array    |
| `DELETE` | `/api/entries?id=<id>` | Remove an entry by id; returns the updated array |

All other requests are served as static files from the project folder.
