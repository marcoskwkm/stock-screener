import React from 'react'

import { Table } from 'react-bootstrap'
import { useUserContext } from './UserContext'

interface Props {
  metrics: Metric[] | null
  data: any
}

const Metrics: React.FC<Props> = ({ metrics, data }) => {
  const { selectedMetrics } = useUserContext()

  if (!selectedMetrics || !metrics) {
    return null
  }

  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Symbol</th>
          {metrics.map(({ id, label }) =>
            selectedMetrics.includes(id) ? <th key={id}>{label}</th> : null
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any) => (
          <tr key={row.symbol}>
            <td>{row.symbol}</td>
            {metrics.map(({ id }) =>
              selectedMetrics.includes(id) ? <td key={id}>{row[id]}</td> : null
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Metrics
