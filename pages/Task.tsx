import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
  due_datetime?: string;
};

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [now, setNow] = useState(new Date());

  /* ADD FORM */
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  /* EDIT FORM */
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDeadline, setFormDeadline] = useState("");

  /* ================= LOAD TASKS ================= */
  const loadTasks = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${userId}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
  const timer = setInterval(() => {
    setNow(new Date());
  }, 60000);

  return () => clearInterval(timer);
}, []);
 const getDeadlineTime = (date?: string) => {
  if (!date) return null;

  const time = new Date(
    date.replace(" ", "T")
  ).getTime();

  return Number.isNaN(time) ? null : time;
};

 const getCountdown = (date?: string) => {
  const deadlineTime = getDeadlineTime(date);

  if (!deadlineTime) return "No deadline";

  const diff = deadlineTime - now.getTime();

  if (diff <= 0) {
    return "Overdue";
  }

  const totalMinutes = Math.floor(
    diff / 60000
  );

  const days = Math.floor(
    totalMinutes / 1440
  );

  const hours = Math.floor(
    (totalMinutes % 1440) / 60
  );

  const mins = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h left`;
  }

  if (hours > 0) {
    return `${hours}h ${mins}m left`;
  }

  return `${mins}m left`;
};

const getTaskStatus = (task: Task) =>
  task.status.trim().toLowerCase();

const isTaskCompleted = (task: Task) =>
  getTaskStatus(task) === "completed";

const isTaskPending = (task: Task) =>
  getTaskStatus(task) === "pending";

const isTaskOverdue = (task: Task) => {
  const deadlineTime = getDeadlineTime(task.due_datetime);

  return (
    isTaskPending(task) &&
    deadlineTime !== null &&
    deadlineTime <= now.getTime()
  );
};

  /* ================= ADD TASK ================= */
  const addTask = () => {
    const userId = localStorage.getItem("userId");

    if (!newTitle.trim()) return;
    if (!userId) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDesc,
        user_id: userId,
        due_datetime: newDeadline || null,
      }),
    })
      .then(() => {
        window.dispatchEvent(new Event("tasks-updated"));
        loadTasks();
        setShowAdd(false);

        setNewTitle("");
        setNewDesc("");
        setNewDeadline("");
      })
      .catch((err) => console.log(err));
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = (task: Task) => {
    setSelectedTask(task);

    setFormTitle(task.title);
    setFormDesc(task.description || "");
    setFormDeadline(
      task.due_datetime
        ? task.due_datetime
            .slice(0, 16)
            .replace(" ", "T")
        : ""
    );

    setShowEdit(true);
  };

 /* ================= SAVE EDIT ================= */
const saveEdit = () => {
  if (!selectedTask) return;

  fetch(
    `${import.meta.env.VITE_API_URL}/api/tasks/${selectedTask.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formTitle,
        description: formDesc,
        due_datetime: formDeadline || null,
      }),
    }
  )
    .then(() => {
      window.dispatchEvent(new Event("tasks-updated"));
      loadTasks();
      setShowEdit(false);
    })
    .catch((err) => console.log(err));
};

  /* ================= COMPLETE ================= */
  const confirmComplete = (task: Task) => {
    setSelectedTask(task);
    setShowComplete(true);
  };

  const completeTask = () => {
    if (!selectedTask) return;

    fetch(
      `${import.meta.env.VITE_API_URL}/api/tasks/complete/${selectedTask.id}`,
      {
        method: "PUT",
      }
    )
      .then(() => {
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === selectedTask.id
              ? { ...task, status: "Completed" }
              : task
          )
        );
        window.dispatchEvent(new Event("tasks-updated"));
        loadTasks();
        setShowComplete(false);
        setSelectedTask(null);
      })
      .catch((err) => console.log(err));
  };

  /* ================= DELETE ================= */
  const confirmDelete = (task: Task) => {
    setSelectedTask(task);
    setShowDelete(true);
  };

  const deleteTask = () => {
    if (!selectedTask) return;

    fetch(
      `${import.meta.env.VITE_API_URL}/api/tasks/${selectedTask.id}`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        window.dispatchEvent(new Event("tasks-updated"));
        loadTasks();
        setShowDelete(false);
      })
      .catch((err) => console.log(err));
  };

 /* ================= FORMAT DATE ================= */
const formatDeadline = (
  date?: string
) => {
  if (!date) return "No deadline";

  const localDate = new Date(
    date.replace(" ", "T")
  );

  return localDate.toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );
};

  /* ================= FILTER ================= */
  const filteredTasks = tasks.filter(
    (task) => {
      if (filter === "Pending")
        return isTaskPending(task);

      if (filter === "Completed")
        return isTaskCompleted(task);

      if (filter === "Overdue")
        return isTaskOverdue(task);

      return true;
    }
  );

  /* ================= SORT ================= */
  const finalTasks = [
    ...filteredTasks,
  ].sort((a, b) => {
    if (sortBy === "Newest")
      return b.id - a.id;

    if (sortBy === "Oldest")
      return a.id - b.id;

    if (
      sortBy ===
      "Deadline Soonest"
    ) {
      return (
        new Date(
          a.due_datetime ||
            "9999-12-31"
        ).getTime() -
        new Date(
          b.due_datetime ||
            "9999-12-31"
        ).getTime()
      );
    }

    if (
      sortBy ===
      "Deadline Latest"
    ) {
      return (
        new Date(
          b.due_datetime || "0"
        ).getTime() -
        new Date(
          a.due_datetime || "0"
        ).getTime()
      );
    }

    return 0;
  });

  return (
    <section className="task-page">
      {/* TOP BAR */}
      <div className="home-strip task-strip">
        <h1>Tasks</h1>

        <div className="task-tools">
          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
          >
            <option>All</option>
            <option>Pending</option>
            <option>
              Completed
            </option>
            <option>Overdue</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>
              Deadline Soonest
            </option>
            <option>
              Deadline Latest
            </option>
          </select>

          <button
            className="add-task-btn"
            onClick={() =>
              setShowAdd(true)
            }
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* TASK GRID */}
      <div className="task-grid">
        {finalTasks.map((task) => {
          const done = isTaskCompleted(task);
          const overdue = isTaskOverdue(task);
          const countdown = done
            ? "Completed"
            : getCountdown(task.due_datetime);

          return (
            <div
              key={task.id}
              className={`task-card ${
                done
                  ? "task-completed"
                  : overdue
                    ? "task-overdue"
                    : ""
              }`}
            >
              <span
                className={`status-dot ${
                  done
                    ? "done"
                    : "pending"
                }`}
              />

              <h3 className="task-title">
                {task.title}
              </h3>

              <p className="task-desc">
                {task.description}
              </p>

              <p className="task-meta">
                Deadline:{" "}
                {formatDeadline(
                  task.due_datetime
                )}
              </p>

              <p
                className={`countdown ${
                  done
                    ? "done-text"
                    : overdue
                      ? "overdue-text"
                      : ""
                }`}
              >
                {countdown}
              </p>

              <p className="task-meta">
                Status:{" "}
                <span
                  className={
                    done
                      ? "done-text"
                      : "pending-text"
                  }
                >
                  {task.status}
                </span>
              </p>

              <div className="task-actions">
                <button
                  className="icon-btn edit"
                  onClick={() =>
                    openEdit(task)
                  }
                >
                  ✎
                </button>

                <button
                  className="icon-btn delete"
                  onClick={() =>
                    confirmDelete(
                      task
                    )
                  }
                >
                  🗑
                </button>

                {!done && (
                  <button
                    className="icon-btn done"
                    onClick={() =>
                      confirmComplete(
                        task
                      )
                    }
                  >
                    ✓
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= ADD MODAL ================= */}
      {showAdd && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Add Task</h2>

            <input
              className="modal-input"
              placeholder="Task Title"
              value={newTitle}
              onChange={(e) =>
                setNewTitle(e.target.value)
              }
            />

            <textarea
              className="modal-input"
              placeholder="Description"
              value={newDesc}
              onChange={(e) =>
                setNewDesc(e.target.value)
              }
            />

            <p className="modal-label">Deadline</p>

            <input
              className="modal-input"
              type="datetime-local"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
            />

            <div className="modal-actions">
              <button
                onClick={() =>
                  setShowAdd(false)
                }
              >
                Cancel
              </button>

              <button
                className="primary"
                onClick={addTask}
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {showEdit && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Edit Task</h2>

            <input
              className="modal-input"
              value={formTitle}
              onChange={(e) =>
                setFormTitle(e.target.value)
              }
            />

            <textarea
              className="modal-input"
              value={formDesc}
              onChange={(e) =>
                setFormDesc(e.target.value)
              }
            />

            <p className="modal-label">Deadline</p>

            <input
              className="modal-input"
              type="datetime-local"
              value={formDeadline}
              onChange={(e) => setFormDeadline(e.target.value)}
            />

            <div className="modal-actions">
              <button
                onClick={() =>
                  setShowEdit(false)
                }
              >
                Cancel
              </button>

              <button
                className="primary"
                onClick={saveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {showDelete && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Delete Confirmation</h2>

            <p>
              Are you sure you want to
              delete this task?
            </p>

            <div className="modal-actions">
              <button
                onClick={() =>
                  setShowDelete(false)
                }
              >
                Cancel
              </button>

              <button
                className="danger"
                onClick={deleteTask}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= COMPLETE MODAL ================= */}
      {showComplete && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Complete Task</h2>

            <p>
              Are you sure you want to
              complete this task?
            </p>

            <div className="modal-actions">
              <button
                onClick={() =>
                  setShowComplete(false)
                }
              >
                Cancel
              </button>

              <button
                className="success"
                onClick={completeTask}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TaskPage;
