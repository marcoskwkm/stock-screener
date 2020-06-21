import React, { createContext, useContext, useMemo, useState } from 'react'

interface UserContext {
  user: string | null
  setUser: (user: string | null) => void
  userMetricsList: UserMetrics[] | null
  setUserMetricsList: (userMetricsList: UserMetrics[] | null) => void
}

const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  userMetricsList: null,
  setUserMetricsList: () => {},
})

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null)
  const [userMetricsList, setUserMetricsList] = useState<UserMetrics[] | null>(
    null
  )

  const value = useMemo<UserContext>(
    () => ({ user, setUser, userMetricsList, setUserMetricsList }),
    [user, setUser, userMetricsList, setUserMetricsList]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
