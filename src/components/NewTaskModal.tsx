// src/components/NewTaskModal.tsx
import React, { useState } from "react";
import type { TaskStatus } from "../types";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  onCreate: (payload: { title: string; description?: string; status: TaskStatus }) => void;
}

const DESC_MAX = 300;

export default function NewTaskModal({ onClose, onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("To Do");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  function validate() {
    const e: { title?: string; description?: string } = {};
    if (!title.trim()) e.title = "Title is required.";
    if (description.length > DESC_MAX) e.description = `Description must be ≤ ${DESC_MAX} characters.`;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setSubmitting(true);
    try {
      await Promise.resolve(onCreate({ title: title.trim(), description: description.trim(), status }));
      toast.success("Task created");
      // reset fields (useful if modal stays open)
      setTitle("");
      setDescription("");
      setStatus("To Do");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create task");
    } finally {
      setSubmitting(false);
      onClose();
    }
  }

  return (
    <Modal onClose={onClose} ariaLabel="Create task">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Create new task</h3>

        <form onSubmit={submit} noValidate>
          <div className="mb-4">
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>

            <input
              id="task-title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
              }}
              disabled={submitting}
              aria-invalid={errors.title ? "true" : "false"}
              aria-describedby={errors.title ? "title-error" : undefined}
              placeholder="Give the task a short, descriptive title"
              className={`block w-full rounded-md border px-3 py-2 shadow-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition
                ${errors.title ? "border-red-300" : "border-gray-200"}`}
              maxLength={120}
            />
            <div className="mt-1 flex items-center justify-between">
              <div id="title-error" className="text-xs text-red-600">{errors.title ?? ""}</div>
              <div className="text-xs text-gray-400">{title.length}/120</div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="task-desc" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>

            <textarea
              id="task-desc"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description && e.target.value.length <= DESC_MAX) setErrors(prev => ({ ...prev, description: undefined }));
              }}
              disabled={submitting}
              aria-invalid={errors.description ? "true" : "false"}
              aria-describedby={errors.description ? "desc-error" : undefined}
              placeholder="(Optional) add details, acceptance criteria or links"
              rows={4}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm resize-none placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition
                ${errors.description ? "border-red-300" : "border-gray-200"}`}
              maxLength={DESC_MAX}
            />
            <div className="mt-1 flex items-center justify-between">
              <div id="desc-error" className="text-xs text-red-600">{errors.description ?? ""}</div>
              <div className="text-xs text-gray-400">{description.length}/{DESC_MAX}</div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="task-status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>

            <select
              id="task-status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              disabled={submitting}
              className="block w-full rounded-md border px-3 py-2 shadow-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition border-gray-200"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={onClose} type="button" disabled={submitting}>
              Cancel
            </Button>
            <Button variant="primary" loading={submitting} type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}