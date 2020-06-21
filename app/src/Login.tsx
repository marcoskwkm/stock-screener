import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Button, Form, Nav, Navbar, Spinner } from 'react-bootstrap'

import { SERVER_URL } from './constants'
import { useUserContext } from './UserContext'

type State = 'initial' | 'form-open' | 'logged-in'

const Login = () => {
  const [state, setState] = useState<State>('initial')
  const [loading, setLoading] = useState<boolean>(false)
  const { user, setUser, setUserMetricsList } = useUserContext()

  const handleUserInputChange = (event: any) => setUser(event.target.value)

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!user) {
      return
    }

    setLoading(true)

    axios
      .get(`${SERVER_URL}/get-metrics?user=${user}`)
      .then((res: AxiosResponse<UserMetrics[]>) => {
        setUserMetricsList(res.data)
        setLoading(false)
        setState('logged-in')
      })
  }

  const handleLogout = () => {
    setUser(null)
    setUserMetricsList(null)
    setState('initial')
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
      <Form inline onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Username"
          className="mr-sm-2"
          onChange={handleUserInputChange}
        />
        <Button
          style={{ minWidth: '75.172px' }}
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            'Submit'
          )}
        </Button>
      </Form>
    )
  }

  return (
    <>
      <Navbar.Text className="mr-sm-2">Signed in as {user}</Navbar.Text>
      <Nav>
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
      </Nav>
    </>
  )
}

export default Login
