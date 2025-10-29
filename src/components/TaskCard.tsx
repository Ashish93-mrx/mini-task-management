import React from "react";
import type { Task, TaskStatus } from "../types";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

interface Props {
    task: Task;
    onChangeStatus: (id: string | number, newStatus: TaskStatus) => void;
    isPreview?: boolean;
}

function TaskCard({ task, onChangeStatus, isPreview = false }: Props) {
    return (
        <Card subtle>
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <div className="font-semibold text-sm leading-tight">{task.title}</div>
                    {task.description ? <div className="text-xs text-gray-600 mt-1">{task.description}</div> : null}
                </div>
            </div>

            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                    <Badge size="sm" status={task.status}>
                        {task.status}
                    </Badge>
                </div>

                <div className="flex items-center gap-2">
                    <select
                        className={`
                            text-sm rounded-md border border-gray-300
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            hover:border-blue-400 transition-colors duration-150
                            px-2 py-1 bg-white shadow-sm
                            disabled:opacity-60 disabled:cursor-not-allowed
                        `}
                        value={task.status}
                        onChange={(e) => onChangeStatus(task.id, e.target.value as TaskStatus)}
                        aria-label={`Change status for ${task.title}`}
                        disabled={isPreview}
                    >
                        <option value="To Do" className="text-gray-700">
                            To Do
                        </option>
                        <option value="In Progress" className="text-yellow-700">
                            In Progress
                        </option>
                        <option value="Done" className="text-green-700">
                            Done
                        </option>
                    </select>

                </div>
            </div>
        </Card>
    );
}

export default React.memo(TaskCard);
