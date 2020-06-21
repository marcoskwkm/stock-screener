import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Accordion, Button, Card, Form, Spinner } from 'react-bootstrap'

import { SERVER_URL } from './constants'
import SaveFilters from './SaveFilters'
import { useUserContext } from './UserContext'

interface Props {
  metrics: Metric[] | null
}

const Filter: React.FC<Props> = ({ metrics }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const {
    user,
    userFiltersList,
    setUserFiltersList,
    selectedMetrics,
    setSelectedMetrics,
    setOrdering,
  } = useUserContext()

  // Fetch userFiltersList
  useEffect(() => {
    if (!user) {
      return
    }

    setLoading(true)

    axios
      .get(`${SERVER_URL}/get-filters?user=${user}`)
      .then((res: AxiosResponse<UserFilter[]>) => {
        setUserFiltersList(res.data)
        setLoading(false)
      })
  }, [user, setUserFiltersList])

  if (!selectedMetrics || !metrics) {
    return null
  }

  const handleSelectSavedFilter = (userFilter: UserFilter) => {
    setSelectedMetrics(userFilter.metrics)
    if (userFilter.ordering_key && userFilter.ordering_order) {
      setOrdering({
        key: userFilter.ordering_key,
        order: userFilter.ordering_order,
      })
    } else {
      setOrdering(null)
    }
  }

  const handleSelectedMetricChange = (id: string, active: boolean) => {
    if (active) {
      if (!selectedMetrics.includes(id)) {
        setSelectedMetrics(selectedMetrics.concat(id))
      }
    } else {
      setSelectedMetrics(selectedMetrics.filter((e) => e !== id))
    }
  }

  return (
    <Accordion className="mb-2">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <div className="pointer flex">
            <h5 className="my-auto">Applied filters</h5>
            {loading && (
              <Spinner
                as="span"
                animation="border"
                variant="secondary"
                size="sm"
                className="my-auto ml-2"
              />
            )}
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {userFiltersList && userFiltersList.length > 0 && (
              <div className="pb-2">
                <Form.Label>Saved filters</Form.Label>
                <div>
                  {userFiltersList.map((userFilter) => (
                    <Button
                      className="p-0 mr-2 text-decoration-none"
                      variant="link"
                      key={userFilter.name}
                      onClick={() => handleSelectSavedFilter(userFilter)}
                    >
                      {userFilter.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <Form.Group className="mb-2" controlId="selectedMetricsForm">
              <Form.Label>Selected metrics</Form.Label>
              <div>
                {metrics.map(({ id, label }) => (
                  <Form.Check
                    inline
                    type="checkbox"
                    id={id}
                    key={id}
                    label={label}
                    checked={selectedMetrics.includes(id)}
                    onChange={(event: any) =>
                      handleSelectedMetricChange(id, event.target.checked)
                    }
                  />
                ))}
              </div>
            </Form.Group>
            <SaveFilters />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default Filter
