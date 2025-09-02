import { createSlice } from '@reduxjs/toolkit';
import taskReducer from '../features/taskSlice';

const initialState = {
  tasks: [] //  tasks {id, text, completed}
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        completed: false
      };
      state.tasks.push(newTask);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    }
  }
});

export const { addTask, removeTask, toggleTask } = taskSlice.actions;

export default taskSlice.reducer;
