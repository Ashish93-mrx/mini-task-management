import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  id: string;
  children: React.ReactNode;
}

export default function DroppableColumn({ id, children }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      id={id}
      className={`bg-white rounded-lg p-4 shadow-sm min-h-[200px] border transition-colors ${
        isOver ? "border-blue-400 bg-blue-50" : "border-transparent"
      }`}
    >
      {children}
    </div>
  );
}