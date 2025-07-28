import React from 'react';

const TaskItem = ({ task, onDelete }) => {
  return (
    <div className="task-item">
      <span>{task.title}</span>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
