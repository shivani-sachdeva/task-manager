import { useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

const TaskInput = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) {
      alert("Task title cannot be empty.");
      return;
    }
    onAdd(title);
    setTitle("");
  };

  return (
    <div className="task-input">
      <input
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default TaskInput;
