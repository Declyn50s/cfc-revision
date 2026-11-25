import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, MemoryRouter, useLocation } from 'react-router-dom'
import App from './App'
import { embedded } from './services/platform'
import { startCloudSync } from './services/cloud'
import './index.css'

const ROUTE_KEY = 'cfc-revision:route'

/**
 * Hors cadre : routage par l'adresse (#/chemin), les liens et le bouton « précédent » fonctionnent.
 * Dans une page hébergée (cadre isolé) : routage en mémoire, la dernière page étant mémorisée pour y revenir.
 */
function RememberRoute() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    try {
      window.localStorage.setItem(ROUTE_KEY, pathname + search)
    } catch {
      /* stockage indisponible */
    }
  }, [pathname, search])
  return null
}

const savedRoute = () => {
  try {
    const r = window.localStorage.getItem(ROUTE_KEY)
    // On ne reprend jamais au milieu d'un examen chronométré.
    return r && r.startsWith('/') && !r.includes('/examens/passer') ? r : '/'
  } catch {
    return '/'
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {embedded ? (
      <MemoryRouter initialEntries={[savedRoute()]}>
        <RememberRoute />
        <App />
      </MemoryRouter>
    ) : (
      <HashRouter>
        <App />
      </HashRouter>
    )}
  </React.StrictMode>,
)

void startCloudSync()
