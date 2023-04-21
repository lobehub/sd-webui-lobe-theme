import { useEffect, useState } from 'react'

function checkIsDarkMode() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch (err) {
    return false
  }
}

export function useIsDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(checkIsDarkMode())

  useEffect(() => {
    const mqList = window.matchMedia('(prefers-color-scheme: dark)')

    const listener = (event: any) => {
      setIsDarkMode(event.matches)
    }

    mqList.addEventListener('change', listener)

    return () => {
      mqList.removeEventListener('change', listener)
    }
  }, [])

  return isDarkMode
}
