import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";
import * as api from "../services/taskApi";
import { useEffect, useState } from "react";
import type { Task } from "../types/task";

const TaskList = () => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const add = async (title: string) => {
    const newTask = await api.createTask(title);
    setTasks((prev) => [...prev, newTask]);
  };

  const remove = async (id: string) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggle = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updated = await api.updateTask(id, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const edit = async (id: string, title: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updated = await api.updateTask(id, { title, completed: task.completed });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };


  return (
    <div className="task-container">
      <h1>Task Manager</h1>
      <TaskInput onAdd={add} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onDelete={remove}
              onToggle={toggle}
              onEdit={edit}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
