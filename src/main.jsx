import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FamilyList from './components/FamilyList.jsx'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
