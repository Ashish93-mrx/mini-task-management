✅ Final Polished README.md
# Mini Task Management Dashboard (Simplified)

A lightweight and responsive **Task Management Dashboard** built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**.

This project demonstrates strong understanding of component-driven architecture, API integration, and modern frontend best practices, including drag-and-drop functionality, modular design, and performance optimization.

---

## Features

- 3-column task board — “To Do”, “In Progress”, and “Done”
- Create new tasks with title, description, and status
- Update task status using dropdown or drag-and-drop
- Persistent storage via `json-server` mock API
- Responsive design using Tailwind CSS
- Optimized re-renders using `useMemo`, `useCallback`, and `React.memo`
- Smooth UX with modals and toast notifications

---

## Development Notes

React 18’s Strict Mode triggers double API calls in development (for effect safety).  
This does **not** occur in production builds.

Verified using:
```bash
npm run build && npm run preview

How to Run Locally
# 1. Install dependencies
npm install

# 2. Start mock API
npx json-server --watch db.json --port 4000

# 3. Run the Vite app
npm run dev


Then open:
http://localhost:5173

Architecture & Approach
1. Project Structure
src/
├── api.ts                  # API functions (fetch, create, update)
├── types.ts                # Type definitions for Task and TaskStatus
├── App.tsx                 # Main dashboard logic (state, DnD context)
├── components/
│   ├── TaskCard.tsx        # Displays a task with title, description, and status
│   ├── SortableTask.tsx    # Drag-and-drop wrapper for TaskCard
│   ├── DroppableColumn.tsx # Represents each column (To Do, In Progress, Done)
│   ├── NewTaskModal.tsx    # Modal for creating new tasks
│   └── ui/                 # Reusable UI components
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Card.tsx
│       └── Badge.tsx
│
├── index.css               # Tailwind setup
└── main.tsx                # React app bootstrap (StrictMode enabled)

2. State Management

Tasks are stored in local component state (useState).

API integration uses async/await with optimistic UI updates.

Derived states and handlers are optimized with React hooks:

useCallback – stabilizes event handlers.

useMemo – memoizes derived task groups.

React.memo – prevents re-renders of unchanged components.

3. Drag-and-Drop

Implemented using @dnd-kit/core and @dnd-kit/sortable.

Users can reorder tasks within a column or move them between columns.

Each drop triggers an API update (PATCH) to persist status.

Drag overlay replicates the task card style for consistent UX.

4. API Layer

Mock REST API powered by json-server.

Run:

npx json-server --watch db.json --port 4000


Endpoints:

GET    /tasks?_sort=createdAt&_order=desc
POST   /tasks
PATCH  /tasks/:id


All API calls are centralized in api.ts for maintainability.

5. Performance Optimizations

useMemo caches derived task groupings (tasksByStatus).

useCallback ensures stable references for event handlers.

React.memo prevents unnecessary re-renders of TaskCard and SortableTask.

These optimizations ensure smooth drag-and-drop and fast UI updates.

6. Styling

TailwindCSS provides utility-first, responsive, and accessible styling.

No external CSS files except for the Tailwind base import.

Layout adapts seamlessly across desktop, tablet, and mobile devices.

Technologies Used

React 18

TypeScript

Vite

TailwindCSS

@dnd-kit/core & @dnd-kit/sortable

json-server

react-hot-toast

Author

Ashish N M
Frontend Developer
Date: October 2025