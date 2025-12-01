import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TimerComponent from './components/TimerComponent'
import NewComponent from './components/NewComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TimerComponent />
      <NewComponent />
    </>
  )
}

export default App
