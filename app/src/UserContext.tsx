import React, { createContext, useContext, useMemo, useState } from 'react'

interface UserContext {
  user: string | null
  setUser: (user: string | null) => void
  userFiltersList: UserFilters[] | null
  setUserFiltersList: (userMetricsList: UserFilters[] | null) => void
}

const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  userFiltersList: null,
  setUserFiltersList: () => {},
})

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null)
  const [userFiltersList, setUserFiltersList] = useState<UserFilters[] | null>(
    null
  )

  const value = useMemo<UserContext>(
    () => ({ user, setUser, userFiltersList, setUserFiltersList }),
    [user, setUser, userFiltersList, setUserFiltersList]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
