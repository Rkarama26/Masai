import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FocusInput from './components/FocusInput'
import RenderCount from './components/RenderCount'
import Pagination from './components/Pagination'
import Manual_Pagination from './components/Manual_Pagination'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <FocusInput/> */}
      {/* <RenderCount /> */}
      {/* <Pagination/> */}
      <Manual_Pagination/>
      
    </>
  )
}

export default App
