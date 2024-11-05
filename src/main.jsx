import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react"
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import { UserProvider } from './components/contexts/User.jsx'

const root = createRoot(document.getElementById("root"))
root.render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
