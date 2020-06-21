import React, { createContext, useContext, useMemo, useState } from 'react'

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
  const [user, setUser] = useState<string | null>(null)
  const [userFiltersList, setUserFiltersList] = useState<UserFilter[] | null>(
    null
  )
  const [selectedMetrics, setSelectedMetrics] = useState<string[] | null>(null)
  const [ordering, setOrdering] = useState<Ordering | null>(null)

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
