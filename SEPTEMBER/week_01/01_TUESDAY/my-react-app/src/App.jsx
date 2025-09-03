import { useState, useMemo } from 'react'
import './App.css'
import ReactMemo from './ReactMemo'
import UsecallBack from './UsecallBack'

function SlowDouble({ number }) {

  const slowFunction = (num) => {
    console.log("Calculating...")
    for (let i = 0; i < 1e9; i++) { } // simaulate heavy task (1 billions time)
    console.log("✅ completed")
    return num * 2
  }
  // optimizing using useMemo - memoize the input value 
  const result = useMemo(() => slowFunction(number), [number])

  return <p>🚀Result: {result} </p>
}

function App() {

  const [number, setnumber] = useState(1);
  const [color, setcolor] = useState(false);


  const toggleColor = () => setcolor(prev => !prev)

  return (
    <>
      {/* <div style={{ backgroundColor: color ? "lightblue" : "lightcoral", padding: "20px" }}>
        <h2>Slow Calculations without useMemo</h2>
        <input type="number" value={number} onChange={(e) => setnumber(Number(e.target.value))} />
        <button onClick={toggleColor}>✏️Toggle background</button>
      </div>
      <SlowDouble number={number} /> */}

      {/* <ReactMemo /> */}
      <UsecallBack />
    </>
  )
}

export default App
