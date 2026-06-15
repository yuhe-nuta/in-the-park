import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Progressive enhancement flag: set before first paint so `.fi` elements
// start hidden (and then animate in) without a flash of visible content.
document.documentElement.classList.add('js-e')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
