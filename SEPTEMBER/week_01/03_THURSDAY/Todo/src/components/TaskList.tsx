// src/components/TaskList.tsx

import React from 'react';
import type { Task } from './TaskManager';
import TaskItem from './TaskItem';


// Interface for Props
interface TaskListProps {
  tasks: Task[];
  toggleCompletion: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleCompletion }) => {
  if (tasks.length === 0) {
    return <p style={{ textAlign: 'center' }}>No tasks to display</p>;
  }

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} toggleCompletion={toggleCompletion} />
      ))}
    </ul>
  );
};

export default TaskList;
