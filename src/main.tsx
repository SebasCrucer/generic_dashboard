
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './contexts/Theme.context.tsx'
import { SessionProvider } from './contexts/Session.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <SessionProvider>
      <App />
    </SessionProvider>
  </ThemeProvider>
)
