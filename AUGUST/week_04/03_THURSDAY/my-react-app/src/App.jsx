import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BlogApp from './components/BlogApp/BlogApp'
import { Route, Routes } from "react-router"
import WeatherApp from './components/WeatherApp/WeatherApp'
import AllApps from './components/All_Apps'


function App() {

  return (
    <>

      <AllApps />
      <Routes>

        <Route path='/blogapp/*' element={<BlogApp />} />
        <Route path='/weatherapp/*' element={<WeatherApp />} />

      </Routes>

    </>
  )
}

export default App
