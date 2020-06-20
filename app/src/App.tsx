import React, { useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap'

import Screener from './Screener'

function App() {
  return (
    <div className="App">
      <Navbar>
        <Navbar.Brand className="mr-auto">Stock Screener</Navbar.Brand>
        <Nav.Link>Login</Nav.Link>
      </Navbar>
      <Screener />
    </div>
  )
}

export default App
