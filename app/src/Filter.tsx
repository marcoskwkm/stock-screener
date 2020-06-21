import React from 'react'
import { Button, Form } from 'react-bootstrap'

import { useUserContext } from './UserContext'

interface Props {
  metrics: Metric[] | null
}

const Filter: React.FC<Props> = ({ metrics }) => {
  const {
    userFiltersList,
    selectedMetrics,
    setSelectedMetrics,
    setOrdering,
  } = useUserContext()

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
    <>
      <h5>Applied filters</h5>
      {userFiltersList && (
        <div className="pb2">
          <Form.Label>Saved filters</Form.Label>
          {userFiltersList.length === 0 && <p>No saved filters</p>}
          <div>
            {userFiltersList.map((userFilter) => (
              <Button
                className="p-0 mr-2"
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
      <Form.Group controlId="selectedMetricsForm">
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
    </>
  )
}

export default Filter
