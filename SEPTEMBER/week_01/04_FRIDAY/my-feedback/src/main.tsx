import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './app/store.ts';
import { ThemeProvider } from 'next-themes';  // For color mode switching
import { Provider } from './components/ui/provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Provider>
        <ThemeProvider attribute="class">
          <App />
        </ThemeProvider>
      </Provider>
    </ReduxProvider>
  </StrictMode>
);
