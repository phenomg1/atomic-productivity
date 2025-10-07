# Atomic Productivity

A minimal Kanban-style productivity board built with React and Vite. Use this boilerplate to jump-start a to-do manager where tasks flow across backlog, to-do, in-progress, review, and done columns.

## Getting started

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000` and automatically reloads when you edit files.

## Project structure

```text
src/
  App.jsx                # Page composition and layout
  main.jsx               # React entry point
  components/            # Presentational UI building blocks
  hooks/useKanbanBoard.js# Encapsulated state and persistence logic
  styles/global.css      # Shared styling tokens and layout rules
```

## Features

- Preconfigured Vite + React tooling for fast development and production builds
- Opinionated Kanban workflow with five standard stages
- Local storage persistence for tasks between sessions
- Accessible keyboard-friendly interactions for moving tasks across columns
- Responsive layout that gracefully adapts to mobile screens

## Next steps

This boilerplate intentionally focuses on essentials. Potential enhancements include:

- Integrating drag-and-drop interactions (e.g., via `@dnd-kit`)
- Syncing board state with an API or collaboration backend
- Adding filters, swimlanes, or WIP limits for advanced workflows
- Introducing authentication and per-user boards
