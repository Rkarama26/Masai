import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@chakra-ui/react'
import Register from './component/Register'
import Login from './component/Login'
import { Route, Routes } from 'react-router'
import PrivateRoute from './PrivateRoute'
import Dashboard from './component/Dashboard'

function App() {

  return (
    <>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            // <PrivateRoute>
            // </PrivateRoute>
            <Dashboard />
            
          } />




        {/* default */}
        <Route path="/" element={<Login />} />

      </Routes>

    </>
  )
}

export default App
