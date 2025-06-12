import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NotificationContextProvider } from './features/Notification/NotificationContext.tsx'
import { SequenceContextProvider } from './features/Aligment/SequenceContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationContextProvider>
      <SequenceContextProvider>
        <App />
      </SequenceContextProvider>
    </NotificationContextProvider>
  </StrictMode>,
)
