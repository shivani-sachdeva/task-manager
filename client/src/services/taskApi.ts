import type { Task } from "../types/task";

const BASE_URL = "http://localhost:5000/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createTask = async (title: string): Promise<Task> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
};

export const updateTask = async (id: string, data: Partial<Task>): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
