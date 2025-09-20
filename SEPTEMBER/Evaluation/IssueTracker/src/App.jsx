import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/HomePage'
import { Route, Routes } from 'react-router-dom'
import IssuesPage from './components/IssuesPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/repo/:owner/:repoName" element={<IssuesPage />} />
      </Routes>
    </>
  )
}

export default App
