import axios from "axios";
import type { Task } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

export async function fetchTasks(): Promise<Task[]> {
  const res = await axios.get<Task[]>(`${API_BASE}/tasks?_sort=createdAt&_order=desc`);
  return res.data;
}

export async function createTask(payload: Omit<Task, "id" | "createdAt">) {
  const toSend = { ...payload, createdAt: new Date().toISOString() };
  const res = await axios.post<Task>(`${API_BASE}/tasks`, toSend);
  return res.data;
}

export async function updateTaskPartial(id: string | number, patch: Partial<Task>) {
  const res = await axios.patch<Task>(`${API_BASE}/tasks/${String(id)}`, patch);
  return res.data;
}