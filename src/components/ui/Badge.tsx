import React from "react";
import type { TaskStatus } from "../../types";

interface BadgeProps {
  size?: "sm" | "md";
  status?: TaskStatus;
  children?: React.ReactNode;
}

export default function Badge({ size = "sm", status, children }: BadgeProps) {
  const colorMap: Record<TaskStatus, string> = {
    "To Do": "bg-blue-100 text-blue-800 border border-blue-300",
    "In Progress": "bg-yellow-100 text-yellow-800 border border-yellow-300",
    "Done": "bg-green-100 text-green-800 border border-green-300",
  };

  const base = `
    inline-flex items-center font-medium rounded-full
    ${size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"}
  `;

  const color = status ? colorMap[status] : "bg-gray-100 text-gray-800 border border-gray-300";

  return <span className={`${base} ${color}`}>{children}</span>;
}
