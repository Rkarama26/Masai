import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './componenets/Counter'
import TodoApp from './componenets/TodoApp'
import TodoApp2 from './componenets/TodoApp2'
import FetchData from './componenets/FetchData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <TodoApp />
      <TodoApp2 />
       

      {/* <FetchData /> */}
    </>
  )
}

export default App
