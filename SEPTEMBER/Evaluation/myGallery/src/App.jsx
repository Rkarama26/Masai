
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import { Route, Routes } from 'react-router'
import PrivateRoute from './PrivateRoute'
import Dashboard from './components/Dashboard'
import GalleryForm from './components/GalleryForn'


function App() {

  return (
    <>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>

          } />
        {/* default path */}
        <Route path="/" element={<Login />} />

      </Routes>
    </>
  )
}

export default App
