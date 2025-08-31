import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from './components/ui/provider'
import store from './store'
import { Provider as ReduxProvider } from "react-redux";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Provider>
        <App />
      </Provider>
    </ReduxProvider>
  </StrictMode>,
)
