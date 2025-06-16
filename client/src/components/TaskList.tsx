import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  const addTask = async () => {
    if (!title.length) return;
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
    setTitle('');
  };

  return (
    <div>
      <div>
        <input
          placeholder="New Task"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li>{t.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
