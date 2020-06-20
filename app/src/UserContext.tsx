import React, { createContext, useContext, useMemo, useState } from 'react'

interface UserContext {
  user: string | null
  setUser: (user: string) => void
  userMetrics: string[] | null
  setUserMetrics: (userMetrics: string[]) => void
}

const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  userMetrics: null,
  setUserMetrics: () => {},
})

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null)
  const [userMetrics, setUserMetrics] = useState<string[] | null>(null)

  const value = useMemo<UserContext>(
    () => ({ user, setUser, userMetrics, setUserMetrics }),
    [user, setUser, userMetrics, setUserMetrics]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
