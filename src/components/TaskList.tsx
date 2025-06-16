import { useState } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

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
        <button>Add Task</button>
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
