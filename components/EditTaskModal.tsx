import { useState } from "react";

type TaskType = {
  id: number;
  title: string;
  completed: boolean;
};

type EditTaskModalProps = {
  task: TaskType;
  onClose: () => void;
  onSave: (updatedTask: TaskType) => void;
};

const EditTaskModal = ({ task, onClose, onSave }: EditTaskModalProps) => {
  const [title, setTitle] = useState(task.title);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      ...task,
      title
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <h2>Edit Task</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn primary" onClick={handleSave}>
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditTaskModal;
