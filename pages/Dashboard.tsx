import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  status: string;
};

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 🔥 GET USER ID
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${userId}`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log(err));
  }, []);

  const isCompleted = (todo: Todo) =>
    todo.status.trim().toLowerCase() === "completed";

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
              {isCompleted(todo) && <span className="check">✓</span>}
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};

export default Dashboard;
