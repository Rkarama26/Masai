import { useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_VISIBILITY':
      return { visible: !state.visible }

    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, { visible: true })

  return (
    <>
      { state.visible && <h1>Hello world</h1>}
      <button onClick={() => dispatch({type: 'TOGGLE_VISIBILITY'})}> 
       {state.visible ? "Hide": "Show"}
      </button>
    </>
  )
}

export default App
