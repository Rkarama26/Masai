import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './conmponent/Counter'
import Auth from './conmponent/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Counter />
      <Auth />
    </>
  )
}

export default App
