import { useState } from "react";
import type { Task } from "../types/task";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

const TaskItem = ({ task, onDelete, onToggle, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const save = () => {
    if (title.trim()) {
      onEdit(task.id, title);
    } else {
      alert("Task title cannot be empty.");
    }
    setIsEditing(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {isEditing ? (
        <input
          className="edit-task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") setIsEditing(false);
          }}
          autoFocus
        />
      ) : (
        <span>{task.title}</span>
      )}
      {!isEditing && (
        <button className="edit-btn" onClick={() => setIsEditing(true)}>✎</button>
      )}
      <button onClick={() => onDelete(task.id)}>✕</button>
    </li>
  );
};

export default TaskItem;
