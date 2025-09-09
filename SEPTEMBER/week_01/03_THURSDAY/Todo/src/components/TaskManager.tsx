import React, { useState } from 'react';
import TaskList from './TaskList';

export const Priority = {
    Low: 'Low',
    Medium: 'Medium',
    High: 'High',
} as const;

export type Priority = typeof Priority[keyof typeof Priority];


export interface Task {
    id: number;
    description: string;
    priority: Priority;
    completed: boolean;
}

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<Priority>(Priority.Low);
    const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

    const addTask = () => {
        if (description.trim() === '') return;

        const newTask: Task = {
            id: Date.now(),
            description,
            priority,
            completed: false,
        };

        setTasks((prev) => [...prev, newTask]);
        setDescription('');
        setPriority(Priority.Low);
    };

    const toggleCompletion = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Task Manager</h1>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={description}
                    placeholder="Task Description"
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    style={{ marginRight: '10px' }}
                >
                    <option value={Priority.Low}>Low</option>
                    <option value={Priority.Medium}>Medium</option>
                    <option value={Priority.High}>High</option>
                </select>

                <button onClick={addTask}>Add Task</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label>
                    Filter:
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        style={{ marginLeft: '10px' }}
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                </label>
            </div>

            <TaskList tasks={filteredTasks} toggleCompletion={toggleCompletion} />
        </div>
    );
};

export default TaskManager;
