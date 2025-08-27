import { useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { theme: state.theme === "dark" ? "light" : "dark" };
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, { theme: 'light' })

  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundColor: state.theme === "light" ? "#fff" : "#333",
          color: state.theme === "light" ? "#000" : "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <h1>{state.theme.toUpperCase()} MODE</h1>
        <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
          Toggle Theme
        </button>
      </div>
    </>
  )
}

export default App
