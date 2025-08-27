import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/contexts/AuthContext.jsx'
import { BrowserRouter, Routes } from "react-router"
import { ThemeProvider } from './components/contexts/ThemeContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
