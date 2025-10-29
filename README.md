# Mini Task Management Dashboard (Simplified)

A lightweight and responsive **Task Management Dashboard** built with **React + TypeScript + Vite + TailwindCSS**.

This project demonstrates strong understanding of component-driven architecture, API integration, and modern frontend best practices, including drag-and-drop functionality, modular design, and performance optimization.

---

## Features

 **3-column task board** — “To Do”, “In Progress”, and “Done”  
 **Create new tasks** with title, description, and status  
 **Update task status** using dropdown or drag-and-drop  
 **Persistent storage** via `json-server` mock API  
 **Responsive design** with Tailwind CSS  
 **Optimized re-renders** using `useMemo`, `useCallback`, and `React.memo`  
 **Polished UX** with smooth DnD, modals, and toast notifications  

---

Development Notes

React 18’s Strict Mode triggers double API calls in development (for effect safety).
This does not occur in production builds.

Verified using npm run build && npm run preview (single fetch).

 How to Run Locally
# 1️⃣ Install dependencies
npm install

# 2️⃣ Start mock API
npx json-server --watch db.json --port 4000

# 3️⃣ Run the Vite app
npm run dev


Then open:
👉 http://localhost:5173

## Architecture & Approach

### 1. **Project Structure**
├── api.ts # API functions (fetch, create, update)
├── types.ts # Type definitions for Task and TaskStatus
├── App.tsx # Main dashboard logic (state, DnD context)
├── components/
│ ├── TaskCard.tsx # Displays a task with title, description, and status
│ ├── SortableTask.tsx # Drag-and-drop wrapper for TaskCard
│ ├── DroppableColumn.tsx # Represents each column (To Do, In Progress, Done)
│ ├── NewTaskModal.tsx # Modal for creating new tasks
│ └── ui/ # Reusable UI components
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── index.ts
│
├── index.css # Tailwind setup
└── main.tsx # React app bootstrap (StrictMode enabled)

---

### 2. **State Management**

- Tasks are stored in local component state (`useState`).
- API integration uses async/await with optimistic UI updates.
- State updates trigger re-render only for affected tasks thanks to:
  - `useCallback` (stabilizes handlers)
  - `useMemo` (memoizes derived data like grouped tasks)
  - `React.memo` (prevents re-render of unchanged task components)

---

### 3. **Drag-and-Drop**
Implemented using `@dnd-kit/core` and `@dnd-kit/sortable`.

- Users can reorder tasks within a column or move them across columns.
- The overlay uses the same visual style as the task card.
- When dropped into a new column, the status is updated and persisted via API.

---

### 4. **API Layer**

- Mock API powered by `json-server`:
```bash
-npx json-server --watch db.json --port 4000

Endpoints:

GET /tasks?_sort=createdAt&_order=desc

POST /tasks

PATCH /tasks/:id

All API logic is abstracted in api.ts for clarity and reusability.

## 5. Performance Optimizations

useMemo caches derived task groupings (tasksByStatus).

useCallback ensures stable function references (handleChangeStatus, handleCreate).

React.memo wraps TaskCard and SortableTask to avoid unnecessary re-renders.

This ensures drag-and-drop and UI updates remain smooth even with large datasets.

## 6. Styling

TailwindCSS for utility-first styling and responsiveness.

Minimal custom CSS — everything is declarative within components.

Layout is responsive and adapts gracefully to mobile and desktop screens.

