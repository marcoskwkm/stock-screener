import React from 'react'
import { Form } from 'react-bootstrap'

interface Props {
  metrics: any
  onSelectedMetricChange: (id: string, active: boolean) => void
}

const Filter: React.FC<Props> = ({ metrics, onSelectedMetricChange }) => {
  return (
    <>
      <h5>Applied filters</h5>
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
