import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

import { ArrowUp, ArrowDown } from './Icons'
import { useUserContext } from './UserContext'

interface Props {
  metrics: Metric[] | null
  data: any
}

const Metrics: React.FC<Props> = ({ metrics, data }) => {
  const [orderedData, setOrderedData] = useState<any>(null)

  const { ordering, setOrdering, selectedMetrics } = useUserContext()

  useEffect(() => {
    const ordered = data.concat()

    if (ordering) {
      ordered.sort((rowA: any, rowB: any) =>
        rowA[ordering.key] < rowB[ordering.key]
          ? -1
          : rowA[ordering.key] === rowB[ordering.key]
          ? 0
          : 1
      )

      if (ordering.order === 'desc') {
        ordered.reverse()
      }
    }

    setOrderedData(ordered)
  }, [data, ordering])

  useEffect(() => console.log(ordering), [ordering])

  if (!selectedMetrics || !metrics || !orderedData) {
    return null
  }

  const columnTitle = (id: string, label: string) => {
    let orderingSymbol = null

    if (ordering && ordering.key === id) {
      orderingSymbol = ordering.order === 'asc' ? <ArrowUp /> : <ArrowDown />
    }

    return (
      <span>
        {label} {orderingSymbol}
      </span>
    )
  }

  const handleChangeOrdering = (id: string) => {
    if (!ordering || ordering.key !== id) {
      setOrdering({ key: id, order: 'asc' })
    } else {
      setOrdering({ key: id, order: ordering.order === 'asc' ? 'desc' : 'asc' })
    }
  }

  return (
    <Table size="sm">
      <thead>
        <tr>
          <th
            className="pointer"
            onClick={() => handleChangeOrdering('symbol')}
          >
            {columnTitle('symbol', 'Symbol')}
          </th>
          {metrics.map(({ id, label }) =>
            selectedMetrics.includes(id) ? (
              <th
                key={id}
                className="pointer"
                onClick={() => handleChangeOrdering(id)}
              >
                {columnTitle(id, label)}
              </th>
            ) : null
          )}
        </tr>
      </thead>
      <tbody>
        {orderedData.map((row: any) => (
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
