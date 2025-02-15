import React, { useState } from "react";
import axios from "axios";
import "./style.css";

const CreateTodo = () => {
  const [task, setTask] = useState({ title: "", completed: false });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: name === "completed" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post("http://localhost:3000/api/todos", task);
      console.log("Task created:", response);

      setMessage({ text: "✅ Task successfully created!", type: "success" });

      setTask({ title: "", completed: false });
    } catch (error) {
      console.error("Error creating task:", error.message);
      setMessage({
        text: "❌ Failed to create task. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create a New Task 📝</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label>Status:</label>
          <select name="completed" value={task.completed} onChange={handleChange}>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>

        <button type="submit" disabled={!task.title || loading}>
          {loading ? <span className="spinner"></span> : "Create Task"}
        </button>
      </form>

      {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
    </div>
  );
};

export default CreateTodo;
