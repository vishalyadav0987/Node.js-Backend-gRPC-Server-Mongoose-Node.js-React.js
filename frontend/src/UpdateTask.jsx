import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./update.css";

const UpdateTask = () => {
  const { id: taskId } = useParams();
  const navigate = useNavigate();


  
  const [taskTitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    getSingleTodo(taskId);
  }, [taskId]);

  const getSingleTodo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/todos/${id}`);
      setTaskTitle(response.data.title);
      setLoading(false);
    } catch (error) {
      setMessage({ text: "Error fetching task. Please try again.", type: "error" });
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      await axios.put(`http://localhost:3000/api/todos/${taskId}`, { title: taskTitle });
      setMessage({ text: "✅ Task updated successfully!", type: "success" });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setMessage({ text: "❌ Failed to update task. Please try again.", type: "error" });
    }
  };

  return (
    <div className="update-container">
      <h2>Update Task 📝</h2>

      {loading ? (
        <p>Loading task...</p>
      ) : (
        <form onSubmit={handleUpdate}>
          <label>Task Title:</label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
          <button style={{
            backgroundColor: taskTitle === "" ? "#cccccc":"#28a745",
          }} type="submit">Update Task</button>
        </form>
      )}

      {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
    </div>
  );
};

export default UpdateTask;
