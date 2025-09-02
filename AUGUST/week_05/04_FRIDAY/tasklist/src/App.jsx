import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, toggleTask} from './features/taskSlice';

function App() {
  const [taskInput, setTaskInput] = useState('');
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskInput.trim() === '') return;
    dispatch(addTask(taskInput));
    setTaskInput('');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h1>Task List</h1>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter task"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={handleAddTask} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '0.5rem' }}>
            <span
              onClick={() => dispatch(toggleTask(task.id))}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {task.text}
            </span>
            <button
              onClick={() => dispatch(removeTask(task.id))}
              style={{ marginLeft: '1rem' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
