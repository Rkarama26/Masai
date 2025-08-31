import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, toggleTodo } from './redux/action'

function App() {
  const [input, setInput] = useState("");
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()


  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
    }
  };


  return (
    <>

      <div className="max-w-md p-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Redux Todo App</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter todo..."
            className="w-full px-2 py-1 border rounded"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-1 text-white bg-blue-500 rounded"
          >
            Add
          </button>
        </div>

        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 border-b"
            >
              <span
                onClick={() => dispatch(toggleTodo(todo.id))}
                className={`cursor-pointer ${todo.status ? "line-through text-gray-500" : ""
                  }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-red-500"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>

    </>
  )
}

export default App
