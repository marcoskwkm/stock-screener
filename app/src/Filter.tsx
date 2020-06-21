import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'

import { useUserContext } from './UserContext'

interface Props {
  metrics: any
  onSelectedMetricChange: (id: string, active: boolean) => void
  onSelectSavedMetrics: (selectedMetrics: string[]) => void
}

const Filter: React.FC<Props> = ({
  metrics,
  onSelectedMetricChange,
  onSelectSavedMetrics,
}) => {
  const { userFiltersList } = useUserContext()

  return (
    <>
      <h5>Applied filters</h5>
      {userFiltersList && (
        <div className="pb2">
          <Form.Label>Saved filters</Form.Label>
          {userFiltersList.length === 0 && <p>No saved filters</p>}
          <div>
            {userFiltersList.map((userFilters) => (
              <Button
                className="p-0"
                variant="link"
                key={userFilters.name}
                onClick={() => onSelectSavedMetrics(userFilters.metrics)}
              >
                {userFilters.name}
              </Button>
            ))}
          </div>
        </div>
      )}
      <Form.Group controlId="selectedMetricsForm">
        <Form.Label>Selected metrics</Form.Label>
        <div>
          {Object.keys(metrics).map((id: string) => (
            <Form.Check
              inline
              type="checkbox"
              id={id}
              key={id}
              label={metrics[id].label}
              checked={metrics[id].active}
              onChange={(event: any) =>
                onSelectedMetricChange(id, event.target.checked)
              }
            />
          ))}
        </div>
      </Form.Group>
    </>
  )
}

export default Filter
