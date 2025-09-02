import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@chakra-ui/react'
import CoffeeList from './component/CoffeeList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

       <CoffeeList/>

    </>
  )
}

export default App
