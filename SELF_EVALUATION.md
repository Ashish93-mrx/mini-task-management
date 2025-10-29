# Self Evaluation – Mini Task Management Dashboard

## Summary

This project successfully meets all requirements outlined in the task document:

- A clean and responsive 3-column task board (To Do, In Progress, Done)
- Ability to create, update, and reorder tasks
- Persistent data handling using a mock REST API (`json-server`)
- Modern stack: React, TypeScript, TailwindCSS, Vite
- Bonus implementation: Drag-and-drop functionality using `@dnd-kit`

The code emphasizes clarity, modularity, and scalability, following best practices for React component design, state management, and performance optimization.

---

## What Went Well

- **Clear architecture:** Components are modular, readable, and maintainable.
- **Optimistic UI updates:** Task creation and status updates reflect instantly for smooth UX.
- **Reusable components:** Core UI elements (Button, Modal, Badge, Card) are generic and reusable.
- **Performance optimization:** Used `useMemo`, `useCallback`, and `React.memo` to minimize unnecessary re-renders.
- **Responsive and accessible UI:** TailwindCSS ensures adaptability across devices.
- **Drag-and-drop integration:** Implemented reordering and cross-column movement using DnD Kit.
- **Error handling:** Graceful fallbacks and toast messages for API and validation feedback.

---

## Challenges Faced

1. **React Strict Mode double rendering**  
   React 18 triggers effects twice in development mode for safety.  
   This caused duplicate API calls initially, which was handled by understanding StrictMode’s intentional behavior.

2. **Drag-and-drop coordination**  
   Managing smooth DnD transitions while preserving correct state updates required careful integration between `@dnd-kit/core` and React’s state model.

3. **Dropdown flicker during interaction**  
   A minor flicker was observed when interacting with the select element under drag context due to overlay re-renders.

4. **Tailwind setup with Vite plugin**  
   The latest Tailwind + Vite setup uses the `@tailwindcss/vite` plugin (no config file).  
   Following updated documentation ensured proper integration.

---

## Self-Criticism

- The DnD logic, while functional, could be modularized into a dedicated custom hook for improved separation of concerns.
- The form validation inside `NewTaskModal` is inline and could be extracted or replaced with a schema-based solution (e.g., Zod or React Hook Form).
- No automated tests were written due to time constraints; unit and integration tests would strengthen reliability.
- Minor flicker remains during dropdown interactions under Strict Mode.
- The app currently uses json-server, which resets data when restarted; a persistent backend would be more realistic.

---

## Improvements If Given More Time

- Implement task editing (inline or modal-based).
- Add search, filters, and sorting functionality.
- Integrate localStorage caching for offline mode.
- Add form validation using Zod or React Hook Form.
- Write unit and integration tests using Jest + React Testing Library.
- Add animations for smoother drag transitions using Framer Motion.
- Convert drag-and-drop logic into a reusable custom hook.

---

## Technology Rating

| Technology / Skill               | Rating (Out of 10) | Notes |
|----------------------------------|---------------------|--------|
| React (Hooks, DnD, State)        | 9 / 10              | Confident in modern React with performance optimizations |
| TypeScript                       | 8.5 / 10            | Strong typing and prop design; could refine generics further |
| API Integration (fetch/json-server) | 9 / 10           | Clean abstraction and optimistic updates |
| CSS / TailwindCSS                | 9 / 10              | Clean utility-based styling with responsive design |
| Code Architecture & Readability  | 9.5 / 10            | Consistent, modular, and production-ready structure |
| Testing & Tooling                | 7 / 10              | Testing omitted for time reasons, but setup is test-ready |

---

## Final Reflection

This project demonstrates:

- Modern, production-quality frontend development with React and TypeScript
- Strong understanding of component design and data flow
- Clean, maintainable code with reusable patterns
- Awareness of UX and performance considerations
- Adaptability to the latest ecosystem tools (Vite, Tailwind, DnD Kit)

If given more time, the focus would be on improving interaction quality, test coverage, and additional user features.  
Overall, this submission represents a balanced blend of functionality, performance, and clean design.

---

**Author:** Ashish N M  
**Date:** October 2025  
**Tech Stack:** React 18, TypeScript, Vite, TailwindCSS, DnD Kit, json-server