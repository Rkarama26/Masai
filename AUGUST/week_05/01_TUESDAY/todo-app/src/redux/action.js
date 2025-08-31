// Action Types
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const REMOVE_TODO = "REMOVE_TODO";

// Action Creators
export const addTodo = (title) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now(),
    title,
    status: false,
  },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});
