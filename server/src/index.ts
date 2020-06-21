import cors from 'cors'
import express, { RequestHandler } from 'express'
import knex from 'knex'
import bodyParser from 'body-parser'

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
app.use(bodyParser.json())

const getSavedFilters = async (user: string) =>
  db
    .select('name', 'metrics', 'ordering_key', 'ordering_order')
    .from('filters')
    .where('username', '=', user)

const rootHandler: RequestHandler = async (_, res) => {
  res.send('ok')
}

const getDataHandler: RequestHandler = async (_, res) => {
  res.json({ data: mockedData, metrics: metricsList })
}

const getFiltersHandler: RequestHandler = async (req, res) => {
  const user = req.query.user as string

  if (!user) {
    res.status(400).send('Invalid username')
    return
  }

  const userSavedFilters = await getSavedFilters(user)

  res.json(userSavedFilters)
}

const saveFiltersHandler: RequestHandler = async (req, res) => {
  let validRequest = true
  const bodyFields = [
    'user',
    'name',
    'metrics',
    'ordering_key',
    'ordering_order',
  ]

  bodyFields.forEach((field) => {
    if (!req.body[field] === undefined) {
      res.status(400).send(`Missing field: ${field}`)
      validRequest = false
    }
  })

  if (!validRequest) {
    return
  }

  const { user, name, metrics, ordering_key, ordering_order } = req.body

  // If a set of filters already exists with the same name for this user,
  // overwrite it.
  const nameAlreadyExists = await db
    .select('*')
    .from('filters')
    .where('username', '=', user)
    .where('name', '=', name)
    .then((rows) => rows.length > 0)

  if (nameAlreadyExists) {
    await db('filters')
      .where('username', '=', user)
      .where('name', '=', name)
      .del()
  }

  await db('filters').insert({
    username: user,
    name,
    metrics,
    ordering_key,
    ordering_order,
  })

  res.send(await getSavedFilters(user))
}

app.get('/', rootHandler)
app.get('/get-data', getDataHandler)
app.get('/get-filters', getFiltersHandler)
app.post('/save-filters', saveFiltersHandler)

app.listen(PORT)
