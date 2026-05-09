import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
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

  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.length - completedCount;

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
            <li key={todo.id} className={todo.completed ? "done" : ""}>
              <span>{todo.title}</span>
              {todo.completed && <span className="check">✓</span>}
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};

export default Dashboard;