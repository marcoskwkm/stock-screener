interface Metric {
  id: string
  label: string
}

type OrderingOrder = 'asc' | 'desc'

interface UserFilter {
  name: string
  metrics: string[]
  ordering_key: string | null
  ordering_order: OrderingOrder | null
}
