import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AfterApp from './AfterApp';
import BeforeApp from './BeforeApp';

function App() {
  const [showOptimised, setShowOptimised] = useState(false);


  return (
    <>
      <div>
        <button onClick={() => setShowOptimised((prev) => !prev)}>
          Toggle {showOptimised ? "Before" : "After"} Optimisation
        </button>
        {showOptimised ? <AfterApp /> : <BeforeApp />}
      </div>
    </>
  )
}

export default App
