import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, MotionConfig } from 'motion/react'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/figtree'
import './styles.css'
import App from './App'

// domMax se carga aparte para no pesar en la carga inicial (se usa para animar el reordenamiento del catálogo).
const features = () => import('./motionFeatures').then((m) => m.default)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LazyMotion features={features} strict>
        <App />
      </LazyMotion>
    </MotionConfig>
  </StrictMode>,
)
