import React from 'react'

import { Table } from 'react-bootstrap'

interface Props {
  metrics: any
  data: any
}

const Metrics: React.FC<Props> = ({ metrics, data }) => {
  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Symbol</th>
          {Object.keys(metrics).map((id) =>
            metrics[id].active ? <th key={id}>{metrics[id].label}</th> : null
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any) => (
          <tr key={row.symbol}>
            <td>{row.symbol}</td>
            {Object.keys(metrics).map((id) =>
              metrics[id].active ? <td key={id}>{row[id]}</td> : null
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Metrics
