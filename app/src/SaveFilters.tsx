import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Button, Form, Spinner } from 'react-bootstrap'

import { SERVER_URL } from './constants'
import { useUserContext } from './UserContext'

type State = 'initial' | 'form-open'

const SaveFilters = () => {
  const [state, setState] = useState<State>('initial')
  const [loading, setLoading] = useState<boolean>(false)
  const [validated, setValidated] = useState<boolean>(true)
  const [name, setName] = useState<string>('')

  const {
    user,
    ordering,
    selectedMetrics,
    setUserFiltersList,
  } = useUserContext()

  // Return to initial state on logout
  useEffect(() => {
    if (!user) {
      setState('initial')
    }
  }, [user])

  if (state === 'initial') {
    if (!user) {
      return <>Please login to save filters</>
    }

    return (
      <Button
        className="p-0 text-decoration-none"
        variant="link"
        onClick={() => setState('form-open')}
      >
        Save selected filters
      </Button>
    )
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (name.length === 0) {
      setValidated(false)
      return
    }

    setLoading(true)

    const requestBody = {
      user,
      name,
      metrics: selectedMetrics,
      ordering_key: ordering?.key,
      ordering_order: ordering?.order,
    }

    await axios
      .post(`${SERVER_URL}/save-filters`, requestBody)
      .then((res: AxiosResponse<UserFilter[]>) => {
        setUserFiltersList(res.data)
        setLoading(false)
        setState('initial')
      })
  }

  const handleCancel = () => {
    setValidated(true)
    setState('initial')
  }

  const handleFiltersNameChange = (event: any) => {
    if (event.target.value.length > 0) {
      setValidated(true)
    }

    setName(event.target.value)
  }

  if (state === 'form-open') {
    return (
      <Form inline onSubmit={handleSubmit}>
        <Form.Group controlId="filterName">
          <Form.Control
            style={{ minWidth: '210px' }}
            type="text"
            placeholder="Name of this set of filters"
            className="mr-sm-2"
            size="sm"
            isInvalid={!validated}
            onChange={handleFiltersNameChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" size="sm" disabled={loading}>
          {loading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            'Save filters'
          )}
        </Button>
        <Button
          className="text-decoration-none"
          variant="link"
          size="sm"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Form>
    )
  }

  return null
}

export default SaveFilters
