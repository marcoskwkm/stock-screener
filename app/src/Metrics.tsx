import React, { useEffect, useRef, useState } from 'react'
import { Form, Table } from 'react-bootstrap'

import { ArrowUp, ArrowDown } from './Icons'
import { useUserContext } from './UserContext'
import { useStateWithStorage } from './utils'

interface Props {
  metrics: Metric[] | null
  data: any
  onRefetchData: () => Promise<void>
}

const Metrics: React.FC<Props> = ({ metrics, data, onRefetchData }) => {
  const [orderedData, setOrderedData] = useState<any>(null)
  const [autoupdate, setAutoupdate] = useStateWithStorage<boolean>(
    (b) => b.toString(),
    (s) => s === 'true',
    'metrics-autoupdate'
  )
  const [refetching, setRefetching] = useState<boolean>(false)
  const intervalRef = useRef<number | null>(null)

  const { ordering, setOrdering, selectedMetrics } = useUserContext()

  // Sorts rows based on the values of ordering
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

  // Autoupdates metrics data
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (autoupdate) {
      intervalRef.current = (setInterval(() => {
        setRefetching(true)
        onRefetchData().then(() => setRefetching(false))
      }, 5000) as unknown) as number
    }
  }, [autoupdate, onRefetchData])

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
    <>
      <div className="flex justify-content-end">
        {refetching && 'Refetching...  '}
        <Form.Check
          inline
          type="checkbox"
          id="autoupdate"
          label="Autoupdate"
          checked={!!autoupdate}
          onChange={(event: any) => setAutoupdate(event.target.checked)}
        />
      </div>
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
                selectedMetrics.includes(id) ? (
                  <td key={id}>{row[id]}</td>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Metrics
