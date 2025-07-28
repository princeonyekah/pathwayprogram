import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!text.trim()) return;
    const res = await axios.post('http://localhost:5000/tasks', { text });
    setTasks([...tasks, res.data]);
    setText('');
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      <div className="task-card">
        <h1>QuickTask</h1>
        <div className="input-section">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a task..."
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <span>{task.text}</span>
              <button onClick={() => deleteTask(task._id)}>✕</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
