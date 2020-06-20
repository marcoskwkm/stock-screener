import React from 'react'
import { Navbar } from 'react-bootstrap'

import Login from './Login'
import Screener from './Screener'
import { UserContextProvider } from './UserContext'

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Navbar className="bb">
          <Navbar.Brand className="mr-auto">Stock Screener</Navbar.Brand>
          <Login />
        </Navbar>
        <Screener />
      </UserContextProvider>
    </div>
  )
}

export default App
