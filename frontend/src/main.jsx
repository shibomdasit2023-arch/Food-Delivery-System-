/*
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{ BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
)
  */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
import ThemeProvider from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>

        <StoreContextProvider>

            <ThemeProvider>

                <App />

            </ThemeProvider>

        </StoreContextProvider>

    </BrowserRouter>

)
