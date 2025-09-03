import { useState } from 'react'

import './App.css'
import { useToggleItems } from './useToggleItems';

function App() {
  const [state, toggleState] = useToggleItems(["A", "B", "C"], 1);

  return (
    <>
      <div>
        <h1>useToggleItems Hook Demo</h1>
        <p>Current State: {state}</p>
        <button onClick={toggleState}>Toggle</button>
      </div>


    </>
  )
}

export default App
