import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import { ChampProvider } from './context/ChampContext.jsx'
import { UserProvider } from './context/UserContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <UserProvider>
        <BrowserRouter>
          <ChampProvider>
            <App />
          </ChampProvider>
        </BrowserRouter>
      </UserProvider>
    </LanguageProvider>
  </StrictMode>,
)
