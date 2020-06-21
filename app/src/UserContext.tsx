import React, { createContext, useContext, useMemo, useState } from 'react'

interface UserContext {
  user: string | null
  setUser: (user: string | null) => void
  userFiltersList: UserFilter[] | null
  setUserFiltersList: (userMetricsList: UserFilter[] | null) => void
  selectedMetrics: string[] | null
  setSelectedMetrics: (selectedMetrics: string[]) => void
}

const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  userFiltersList: null,
  setUserFiltersList: () => {},
  selectedMetrics: [],
  setSelectedMetrics: () => {},
})

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null)
  const [userFiltersList, setUserFiltersList] = useState<UserFilter[] | null>(
    null
  )
  const [selectedMetrics, setSelectedMetrics] = useState<string[] | null>(null)

  const value = useMemo<UserContext>(
    () => ({
      user,
      setUser,
      userFiltersList,
      setUserFiltersList,
      selectedMetrics,
      setSelectedMetrics,
    }),
    [
      user,
      setUser,
      userFiltersList,
      setUserFiltersList,
      selectedMetrics,
      setSelectedMetrics,
    ]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
