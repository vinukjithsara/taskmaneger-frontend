import { useState } from "react";
type TaskType = {
  id: number;
  title: string;
  status: string;
};

type AddTaskModalProps = {
  onClose: () => void;
  onAdd: (task: TaskType) => void;
};

const AddTaskModal = ({ onClose, onAdd }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    onAdd({
      id: Date.now(), // fake unique id
      title,
      status: "Pending"
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <h2>Add Task</h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn primary" onClick={handleAdd}>
            Add
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddTaskModal;
