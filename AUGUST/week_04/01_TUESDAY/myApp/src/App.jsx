import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FetchData from './component/FetchData'
import TimerComponent from './component/TimerComponent'

function App() {
  const [count, setCount] = useState(0)
  const [name, setname] = useState("Tommy");

  const [show, setshow] = useState(false);


  // 1.
  // it will triggered at each lifecycle
  // useEffect run when components mounted, updates , and un-mounted


  useEffect(() => {
    console.log('Component mounted or count changed:')
  }, [count, name])


  return (
    <>


      {/* <div>
        <h1>Count: {count}</h1>
        <h1>{name}</h1>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setname("Bob")}>ChangeName</button>

      </div>
       */}

      {/* <FetchData /> */}
      {show && <TimerComponent />}
      <button onClick={() => setshow(!show)}>Show Timer</button>

    </>
  )
}

export default App
