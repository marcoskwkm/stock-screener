import React from 'react'
import { Navbar } from 'react-bootstrap'

import Login from './Login'
import Screener from './Screener'

function App() {
  return (
    <div className="App">
      <Navbar>
        <Navbar.Brand className="mr-auto">Stock Screener</Navbar.Brand>
        <Login />
      </Navbar>
      <Screener />
    </div>
  )
}

export default App
