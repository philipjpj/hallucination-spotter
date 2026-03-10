import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HallucinationSpotter from './HallucinationSpotter'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HallucinationSpotter />
  </StrictMode>
)
