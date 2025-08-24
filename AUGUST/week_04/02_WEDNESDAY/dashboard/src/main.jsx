import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from './components/ui/provider';
import { ThemeContextProvider } from './dashboardComponents/ThemeContextProvider';
import { AuthContextProvider } from './dashboardComponents/AuthContextProvider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <ThemeContextProvider>
        <AuthContextProvider>

          <App />
          
        </AuthContextProvider>
      </ThemeContextProvider>
    </Provider>
  </StrictMode>
)
