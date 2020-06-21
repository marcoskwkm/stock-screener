import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Container, Row, Spinner } from 'react-bootstrap'

import { SERVER_URL } from './constants'
import Filter from './Filter'
import Metrics from './Metrics'
import { useUserContext } from './UserContext'

const Screener = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [metrics, setMetrics] = useState<Metric[] | null>(null)
  const [metricsData, setMetricsData] = useState<any>(null)

  const { selectedMetrics, setSelectedMetrics } = useUserContext()

  // Load data
  useEffect(() => {
    axios.get(`${SERVER_URL}/get-data`).then((res: AxiosResponse<any>) => {
      const { data, metrics } = res.data
      setMetrics(metrics)
      setMetricsData(data)
      setLoading(false)
    })
  }, [])

  // Set default selected metrics
  useEffect(() => {
    if (!selectedMetrics && metrics) {
      setSelectedMetrics(metrics.map((metric: Metric) => metric.id))
    }
  }, [metrics, selectedMetrics, setSelectedMetrics])

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
      <Filter metrics={metrics} />
      <Metrics metrics={metrics} data={metricsData} />
    </div>
  )
}

export default Screener
