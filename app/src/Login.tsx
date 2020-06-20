import React, { useState } from 'react'
import { Button, Form, Nav, Navbar } from 'react-bootstrap'

type State = 'initial' | 'form-open' | 'logged-in'

const Login = () => {
  const [state, setState] = useState<State>('initial')
  const [user, setUser] = useState<string | null>(null)

  const handleUserInputChange = (event: any) => setUser(event.target.value)

  const handleSubmit = async () => {
    setState('logged-in')
  }

  if (state === 'initial') {
    return (
      <Nav>
        <Nav.Link onClick={() => setState('form-open')}>Login</Nav.Link>
      </Nav>
    )
  }

  if (state === 'form-open') {
    return (
      <Form inline>
        <Form.Control
          type="text"
          placeholder="Username"
          className="mr-sm-2"
          onChange={handleUserInputChange}
        />
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    )
  }

  return (
    <>
      <Navbar.Text className="mr-sm-2">Signed in as {user}</Navbar.Text>
      <Nav>
        <Nav.Link onClick={() => setState('initial')}>Logout</Nav.Link>
      </Nav>
    </>
  )
}

export default Login
