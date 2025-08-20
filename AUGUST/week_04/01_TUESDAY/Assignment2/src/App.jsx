import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuoteGenerator from './components/QuoteGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <QuoteGenerator />
      </div>
    </>
  )
}

export default App
