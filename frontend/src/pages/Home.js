import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem.js";

const API_URL = "http://localhost:5000/api/tasks"; // Adjust port if needed

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create a task
  const addTask = async () => {
    if (!newTask.trim()) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask })
    });

    setNewTask("");
    fetchTasks();
  };

  // Update task (toggle completed)
  const toggleComplete = async (id, completed) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    });

    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    fetchTasks();
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={() => toggleComplete(task._id, task.completed)}
          onDelete={() => deleteTask(task._id)}
        />
      ))}
    </div>
  );
}

export default Home;
