import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@chakra-ui/react'
import Register from './component/Register'
import Login from './component/Login'
import { Route, Routes } from 'react-router'
import Dashboard from './component/Dashboard'
import PrivateRoute from './component/PrivateRoute'
import QuizResult from './component/Quiz-Result'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* private route */}
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path='/quizresult' element={
          <PrivateRoute>
            <QuizResult />
          </PrivateRoute>
        } />

        {/* default */}

        <Route path='/' element={<Login />} />
      </Routes>

    </>
  )
}

export default App
