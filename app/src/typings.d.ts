interface Metric {
  id: string
  label: string
  active: boolean
}

interface UserFilters {
  name: string
  metrics: string[]
}
