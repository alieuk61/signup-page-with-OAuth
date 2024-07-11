import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ContextProvider from './context/context'
import LoginPage from './mainpage'
import SignUpPage from './pages/signup-page'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path='/' Component={LoginPage}/>
          <Route path='/register' Component={SignUpPage}/>
        </Routes>
      </Router>
    </ContextProvider>
  </React.StrictMode>,
)
