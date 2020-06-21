import React, { useEffect, useState } from 'react'

export const useStateWithStorage: <T>(arg0: (_: T) => string, arg1: (__: string) => T, arg2: string) => [
  T | null,
  React.Dispatch<React.SetStateAction<T | null>>
] = <T>(mapToString: (arg: T) => string, mapFromString: (arg: string) => T, storageKey: string) => {
  let initialValue = null
  const storedValue = sessionStorage.getItem(storageKey)

  if (storedValue) {
    initialValue = mapFromString(storedValue)
  }

  const [value, setValue] = useState<T | null>(
    initialValue
  )

  useEffect(() => {
    if (!value) {
      sessionStorage.removeItem(storageKey)
    } else {
      sessionStorage.setItem(storageKey, mapToString(value))
    }
  }, [value, mapToString, storageKey])

  return [value, setValue]
}
