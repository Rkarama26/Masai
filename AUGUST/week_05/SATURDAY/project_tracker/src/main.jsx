import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider as ChakraProvider } from './components/ui/provider'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './app/store'


createRoot(document.getElementById('root')).render(

  <ChakraProvider>
    <AuthProvider>
        <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
        </BrowserRouter>
    </AuthProvider>
  </ChakraProvider>

)
