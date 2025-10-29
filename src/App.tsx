import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import type { Task, TaskStatus } from "./types";
import { fetchTasks, createTask, updateTaskPartial } from "./api";

const SortableTask = React.lazy(() => import("./components/SortableTask"));
import NewTaskModal from "./components/NewTaskModal";

import DroppableColumn from "./components/DroppableColumn";
import {
    DndContext,
    closestCenter,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { Toaster } from "react-hot-toast";
import TaskCard from "./components/TaskCard";
import { Button } from "./components/ui";

const COLUMNS = ["To Do", "In Progress", "Done"] as const;

export default function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showNew, setShowNew] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        load();
    }, []);

    async function load() {
        setLoading(true);
        try {
            const res = await fetchTasks();
            setTasks(res);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    }

    const tasksByStatus = useMemo<Record<TaskStatus, Task[]>>(() => {
        return {
            "To Do": tasks.filter((t) => t.status === "To Do"),
            "In Progress": tasks.filter((t) => t.status === "In Progress"),
            "Done": tasks.filter((t) => t.status === "Done"),
        };
    }, [tasks]);

    // memoize create handler
    const handleCreate = useCallback(
        async (payload: {
            title: string;
            description?: string;
            status: TaskStatus;
        }) => {
            try {
                const temp: Task = {
                    id: Date.now(),
                    ...payload,
                    createdAt: new Date().toISOString(),
                };
                setTasks((prev) => [temp, ...prev]);
                const created = await createTask(payload as any);
                setTasks((prev) => prev.map((t) => (t.id === temp.id ? created : t)));
            } catch (err) {
                console.error(err);
                setError("Failed to create task");
                load();
            }
        },
        []
    );

    // Stable callback for updating status (uses functional update to avoid stale closure)
    const handleChangeStatus = useCallback(async (id: string | number, newStatus: TaskStatus) => {
        const idStr = String(id);
        setTasks((prev) => prev.map((t) => (String(t.id) === idStr ? { ...t, status: newStatus } : t)));
        try {
            await updateTaskPartial(id, { status: newStatus });
        } catch (err) {
            console.error(err);
            setError("Failed to update task");
            // Fallback: reload data to ensure consistency
            load();
        }
    }, []);

    function handleDragStart(event: DragStartEvent) {
        setActiveId(String(event.active.id));
        try {
            document.body.style.cursor = "grabbing";
        } catch { }
    }

    function handleDragEnd(event: DragEndEvent) {
        try {
            document.body.style.cursor = "";
        } catch { }
        const { active, over } = event;
        if (!over) {
            setActiveId(null);
            return;
        }

        const activeIdStr = String(active.id);
        const overIdStr = String(over.id);

        if ((COLUMNS as readonly string[]).includes(overIdStr)) {
            handleChangeStatus(activeIdStr, overIdStr as TaskStatus);
            setActiveId(null);
            return;
        }

        const activeTask = tasks.find((t) => String(t.id) === activeIdStr);
        const overTask = tasks.find((t) => String(t.id) === overIdStr);
        if (!activeTask || !overTask) {
            setActiveId(null);
            return;
        }

        if (activeTask.status === overTask.status) {
            const column = activeTask.status;
            const colTasks = tasksByStatus[column];
            const oldIndex = colTasks.findIndex((t) => String(t.id) === activeIdStr);
            const newIndex = colTasks.findIndex((t) => String(t.id) === overIdStr);
            if (oldIndex === -1 || newIndex === -1) {
                setActiveId(null);
                return;
            }
            const reordered = arrayMove(colTasks, oldIndex, newIndex);

            setTasks((prev) => [
                ...prev.filter((t) => t.status !== column),
                ...reordered,
            ]);
        } else {
            handleChangeStatus(activeIdStr, overTask.status);
        }

        setActiveId(null);
    }

    const activeTask = activeId ? tasks.find((t) => String(t.id) === activeId) ?? null : null;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <Toaster position="top-right" />
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Mini Task Management Dashboard</h1>
                    <Button onClick={() => setShowNew(true)} variant="primary">
                        Add New Task
                    </Button>
                </div>

                {loading ? (
                    <div className="text-gray-500">Loading tasks…</div>
                ) : error ? (
                    <div className="text-red-600">{error}</div>
                ) : null}

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <Suspense
                        fallback={
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {COLUMNS.map((c) => (
                                    <div key={c} className="bg-white rounded-lg p-4 min-h-[150px] animate-pulse">
                                        <h3 className="text-lg font-medium text-gray-400">{c}</h3>
                                    </div>
                                ))}
                            </div>
                        }
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {COLUMNS.map((col: TaskStatus) => {
                                const colTasks = tasksByStatus[col];
                                return (
                                    <DroppableColumn key={col} id={col}>
                                        <h3 className="text-lg font-medium mb-3 flex items-center justify-between">
                                            <span>{col}</span>
                                            <span className="text-sm text-gray-500">{colTasks.length}</span>
                                        </h3>

                                        <SortableContext items={colTasks.map((t) => String(t.id))} strategy={verticalListSortingStrategy}>
                                            <div className="space-y-3 min-h-[50px]">
                                                {colTasks.map((task) => (
                                                    <SortableTask key={task.id} task={task} onChangeStatus={handleChangeStatus} />
                                                ))}
                                            </div>
                                        </SortableContext>
                                    </DroppableColumn>
                                );
                            })}
                        </div>
                    </Suspense>

                    <DragOverlay dropAnimation={{ duration: 160 }}>
                        {activeTask ? (
                            <div className="w-full cursor-grabbing">
                                <TaskCard task={activeTask} onChangeStatus={() => { }} isPreview />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>

                {showNew && <NewTaskModal onClose={() => setShowNew(false)} onCreate={handleCreate} />}
            </div>
        </div>
    );
}