// src/components/TaskItem.tsx

import React from 'react';
import type { Task } from './TaskManager';

// Props Interface
interface TaskItemProps {
  task: Task;
  toggleCompletion: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleCompletion }) => {
  return (
    <li
      style={{
        padding: '10px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        borderRadius: '8px',
        backgroundColor: task.completed ? '#d3ffd3' : '#fff',
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompletion(task.id)}
        style={{ marginRight: '10px' }}
      />
      <strong>{task.description}</strong> — <em>{task.priority}</em>
    </li>
  );
};

export default TaskItem;
