import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task, TaskStatus } from "../types";
import TaskCard from "./TaskCard";

interface Props {
  task: Task;
  onChangeStatus: (id: string | number, status: TaskStatus) => void;
}

function SortableTask({ task, onChangeStatus }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: String(task.id),
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    visibility: isDragging ? "hidden" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "" : "cursor-grab"} mb-3`}
      {...attributes}
      {...listeners}
    >
      <TaskCard task={task} onChangeStatus={onChangeStatus} />
    </div>
  );
}

export default React.memo(SortableTask);
