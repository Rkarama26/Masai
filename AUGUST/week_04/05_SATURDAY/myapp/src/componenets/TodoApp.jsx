import React, { useState } from 'react';

const TodoApp = () => {

    const [todos, settodos] = useState([]);


    function addTodo(text) {
        settodos([...todos, { id: Date.now(), text, completed: false }]);
    }
    function  toggleTodo(id){  
        settodos(todos.map(todo => todo.id === id ? {...todo, completed:!todo.completed} : todo ))
    }
  function deleteTodo(id){
    settodos(todos.filter(todo => todo.id !== id))
  }


    return (
        <>
            <h1>Todo App</h1>
            <button onClick={() => addTodo("new task")}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span style={{color: todo.completed ? 'green' : 'red' }} onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                        <button onClick={() => deleteTodo(todo.id)}>❌</button>
                    </li>
                ))}
            </ul>


        </>
    );
}

export default TodoApp;
