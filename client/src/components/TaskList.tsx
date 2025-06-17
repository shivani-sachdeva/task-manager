import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditedTitle(task.title);
  };

  const handleSave = async () => {
    if (editedTitle.trim()) {
      const task = tasks.find((t) => t.id == editingId);
      if (!task) return;
      const res = await fetch(`http://localhost:5000/tasks/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: task.completed, title: editedTitle }),
      });
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id == editingId ? updated : t)));
      setEditingId('');
      setEditedTitle('');
    }
    else {
      alert("Task title cannot be empty.");
      setEditingId('');
      setEditedTitle('');
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      console.log("ESCAPED");
      setEditingId('');
      setEditedTitle('');
    }
  };

  const addTask = async () => {
    if (!title.trim()) {
      alert("Task title cannot be empty.");
      setTitle('');
      return;
    }
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
    setTitle("");
  };

  const deleteTask = async (id: string) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed, title: task.completed }),
    });
    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  return (
    <div className="task-container">
      <div className="task-input">
        <input
          placeholder="New Task"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onKeyDown={(e)=> {if (e.key === "Enter") addTask()}}
        ></input>
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
            />
            {editingId == t.id ? (
              <input
                className="edit-task"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <span>{t.title}</span>
            )}
            {editingId !== t.id && (
              <button className="edit-btn" onClick={()=>startEdit(t)}>
                ✎
              </button>
            )}
            <button onClick={() => deleteTask(t.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
