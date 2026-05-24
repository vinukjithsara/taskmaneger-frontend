import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Todo = {
  id: number;
  title: string;
  status: string;
};

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const location = useLocation();

  // 🔥 GET USER ID
  const userId = localStorage.getItem("userId");

  const loadTasks = useCallback(() => {
    if (!userId) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${userId}`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log(err));
  }, [userId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks, location.key]);

  useEffect(() => {
    const refreshDashboard = () => loadTasks();

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") {
        loadTasks();
      }
    };

    window.addEventListener("focus", refreshDashboard);
    window.addEventListener("tasks-updated", refreshDashboard);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      window.removeEventListener("focus", refreshDashboard);
      window.removeEventListener("tasks-updated", refreshDashboard);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [loadTasks]);

  const isCompleted = (todo: Todo) =>
    todo.status?.trim().toLowerCase() === "completed";

  const completedCount = todos.filter(isCompleted).length;
  const pendingCount = todos.filter(todo => !isCompleted(todo)).length;

  return (
    <section className="dashboard-page">

      {/* TOP STRIP */}
      <div className="home-strip">
        <h1>Dashboard</h1>
      </div>

      <div className="dashboard-content">

        {/* STATS */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-number">{todos.length}</span>
            <span className="stat-label"> Total Tasks</span>
          </div>

          <div className="stat-card completed">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label"> Completed</span>
          </div>

          <div className="stat-card pending">
            <span className="stat-number">{pendingCount}</span>
            <span className="stat-label"> Pending</span>
          </div>
        </div>

        {/* TASK LIST */}
        <h2 className="section-title">
          Today <span>Tasks</span>
        </h2>

        <ul className="task-list">
          {todos.map((todo) => (
            <li key={todo.id} className={isCompleted(todo) ? "done" : ""}>
              <span>{todo.title}</span>
              {isCompleted(todo) && (
                <div
                  className="completed-badge dashboard-completed-badge"
                  aria-label="Completed"
                >
                  &#10003;
                </div>
              )}
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};

export default Dashboard;
