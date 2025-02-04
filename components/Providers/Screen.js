'use client'
import React, { createContext, useState, useEffect, useMemo } from "react"
import { addDebouncedEventListener, isBrowser } from "@/functions/functions"
import { desktop, tablet, mobile } from "@/styles/media"

/**
 * Gives access to media queries
 */

export const ScreenContext = createContext({
  fullWidth: false,
  desktop: false,
  tablet: false,
  mobile: false,
})

const ScreenProvider = ({ children }) => {
  const [fw, setFw] = useState(false)
  const [d, setD] = useState(false)
  const [t, setT] = useState(false)
  const [m, setM] = useState(false)

  useEffect(() => {
    if (isBrowser()) {
      const setScreenContext = () => {
        setM(window.innerWidth <= mobile)
        setT(window.innerWidth > mobile && window.innerWidth <= tablet)
        setD(window.innerWidth > tablet && window.innerWidth <= desktop)
        setFw(window.innerWidth > desktop)
      }

      setScreenContext()

      const removeListener = addDebouncedEventListener(
        window,
        "resize",
        setScreenContext,
        100
      )

      return removeListener
    }
  }, [])

  const screenValue = useMemo(() => {
    return { fullWidth: fw, desktop: d, tablet: t, mobile: m }
  }, [d, fw, t, m])

  return (
    <ScreenContext.Provider value={screenValue}>
      {children}
    </ScreenContext.Provider>
  )
}

export default ScreenProvider
