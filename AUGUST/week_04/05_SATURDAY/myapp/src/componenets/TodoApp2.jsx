import React, { useReducer } from 'react';


function todReducer(todos, action) {
    switch (action.type) {
        case 'ADD':
            return [...todos, { id: Date.now(), text: action.payload, completed: false }]

        case 'TOGGLE':
            return todos.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)

        case 'DELETE':
            return todos.filter(todo => todo.id !== action.payload)
    }
}

const TodoApp2 = () => {


    const [todos, dispatch] = useReducer(todReducer, [])



    return (
        <>
            <h1>Todo App-2 (With useReducer)</h1>
            {/* Dispatching a task, with action object */}
            <button onClick={() => dispatch({ type: "ADD", payload: "NEW TASK" })}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span style={{ color: todo.completed ? 'green' : 'red' }}
                            onClick={() => dispatch({ type: 'TOGGLE', payload: todo.id })}>{todo.text}</span>

                        <button onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}>❌</button>
                    </li>
                ))}
            </ul>


        </>
    );
}

export default TodoApp2;
