import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider as ChakraProvider } from './components/ui/provider'
import { Provider } from 'react-redux'
import store from './redux/store'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </StrictMode>,
)
