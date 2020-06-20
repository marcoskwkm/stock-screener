import React from 'react'
import { Container, Form } from 'react-bootstrap'

const metricsList = [
  { id: 'name', label: 'Name' },
  { id: 'price', label: 'Price' },
  { id: 'pchange', label: '% Change' },
  { id: 'vol', label: 'Volume' },
  { id: 'avgvol', label: 'Avg Vol (3 month)' },
  { id: 'mktcap', label: 'Market Cap' },
  { id: 'peratio', label: 'PE Ratio (TTM)' },
  { id: 'weekrange', label: '52 Week Range' },
]

const Filter = () => {
  return (
    <Container fluid>
      <h5>Applied filters</h5>
      <Form.Group controlId="selectedMetricsForm">
        <Form.Label>Selected metrics</Form.Label>
        <div>
          {metricsList.map((metric) => (
            <Form.Check
              inline
              type="checkbox"
              id={metric.id}
              key={metric.id}
              label={metric.label}
              onChange={(event: any) =>
                console.log(`${metric.label}: ${event.target.checked}`)
              }
            />
          ))}
        </div>
      </Form.Group>
    </Container>
  )
}

export default Filter
