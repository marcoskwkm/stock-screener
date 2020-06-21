import React, { createContext, useContext, useMemo, useState } from 'react'

import { useStateWithStorage } from './utils'

interface Ordering {
  key: string
  order: OrderingOrder
}

interface UserContext {
  user: string | null
  setUser: (user: string | null) => void
  userFiltersList: UserFilter[] | null
  setUserFiltersList: (userMetricsList: UserFilter[] | null) => void
  selectedMetrics: string[] | null
  setSelectedMetrics: (selectedMetrics: string[]) => void
  ordering: Ordering | null
  setOrdering: (ordering: Ordering | null) => void
}

const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  userFiltersList: null,
  setUserFiltersList: () => {},
  selectedMetrics: [],
  setSelectedMetrics: () => {},
  ordering: null,
  setOrdering: () => {},
})

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useStateWithStorage(
    (s) => s,
    (s) => s,
    'context-user'
  )
  const [userFiltersList, setUserFiltersList] = useState<UserFilter[] | null>(
    null
  )
  const [selectedMetrics, setSelectedMetrics] = useStateWithStorage<string[]>(
    (a) => a.toString(),
    (s) => s.split(','),
    'context-selectedMetrics'
  )
  const [ordering, setOrdering] = useStateWithStorage<Ordering>(
    (o) => JSON.stringify(o),
    (s) => JSON.parse(s) as Ordering,
    'context-ordering'
  )

  const value = useMemo<UserContext>(
    () => ({
      user,
      setUser,
      userFiltersList,
      setUserFiltersList,
      selectedMetrics,
      setSelectedMetrics,
      ordering,
      setOrdering,
    }),
    [
      user,
      setUser,
      userFiltersList,
      setUserFiltersList,
      selectedMetrics,
      setSelectedMetrics,
      ordering,
      setOrdering,
    ]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
