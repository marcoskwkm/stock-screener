import cors from 'cors'
import express, { RequestHandler } from 'express'
import knex from 'knex'

import { metricsList, mockedData } from './mocks'

const PORT = process.env.PORT || 3001

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    database: 'stock-screener',
  },
})

const app = express()
app.use(cors())

const rootHandler: RequestHandler = async (_, res) => {
  res.send('ok')
}

const getDataHandler: RequestHandler = async (_, res) => {
  res.json({ data: mockedData, metrics: metricsList })
}

const getMetricsHandler: RequestHandler = async (req, res) => {
  const user = req.query.user as string

  if (!user) {
    res.status(400).send('Invalid username')
  }

  const userSavedMetrics = await db
    .select('name', 'metrics')
    .from('metrics')
    .where('username', '=', user)

  res.json(userSavedMetrics)
}

app.get('/', rootHandler)
app.get('/get-data', getDataHandler)
app.get('/get-metrics', getMetricsHandler)

app.listen(PORT)
