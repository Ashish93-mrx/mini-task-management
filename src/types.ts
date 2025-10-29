export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  id: string | number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt?: string;
}