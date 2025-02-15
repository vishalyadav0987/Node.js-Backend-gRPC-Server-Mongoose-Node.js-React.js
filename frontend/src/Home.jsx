import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/todos");
      setTasks(response.data.todos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const toggleTask = async (tit,id, completed) => {
    try {
      await axios.put(`http://localhost:3000/api/todos/${id}`, {
        title: tit,
        completed: !completed,
      });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  return (
    <div className="home-container">
      <h1>📝 Todo List</h1>
      <p>Manage your tasks easily. Mark them as completed or delete them.</p>

      <h2>Your Tasks:</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              <span>
                <strong>{task.title}</strong> - {task.completed ? "✅ Completed" : "⏳ Pending"}
              </span>
              <div className="task-actions">
                <button className="toggle" onClick={() => toggleTask(task.title,task.id, task.completed)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
                {
                  !task?.completed && (
                    <button className="delete" style={{background:"#28a745"}} onClick={()=>{
                      navigate(`/update-task/${task?.id}`)
                    }}>Update</button>
                  )
                }
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks yet. Add some!</p>
      )}
    </div>
  );
};

export default Home;
