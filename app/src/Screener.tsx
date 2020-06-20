import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'

import { SERVER_URL } from './constants'
import Filter from './Filter'
import Metrics from './Metrics'

import { Container, Row, Spinner } from 'react-bootstrap'

const Screener = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [metrics, setMetrics] = useState<any>(null)
  const [metricsData, setMetricsData] = useState<any>(null)

  // Load data
  useEffect(() => {
    axios.get(`${SERVER_URL}/get-data`).then((res: AxiosResponse<any>) => {
      const { data, metrics } = res.data
      setMetrics(
        metrics.reduce(
          (acc: any, metric: Metric) => ({
            ...acc,
            [metric.id]: {
              label: metric.label,
              active: true,
            },
          }),
          {}
        )
      )
      setMetricsData(data)
      setLoading(false)
    })
  }, [])

  const handleSelectedMetricChange = (id: string, active: boolean) =>
    setMetrics({
      ...metrics,
      [id]: {
        ...metrics[id],
        active,
      },
    })

  if (loading) {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Spinner animation="border" variant="secondary" />
        </Row>
      </Container>
    )
  }

  return (
    <div className="pa3">
      <Filter
        metrics={metrics}
        onSelectedMetricChange={handleSelectedMetricChange}
      />
      <Metrics metrics={metrics} data={metricsData} />
    </div>
  )
}

export default Screener
