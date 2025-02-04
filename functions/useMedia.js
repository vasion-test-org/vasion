import { useCallback, useEffect, useState } from "react"
import { desktop, tablet, mobile } from "@/styles/media"
import { isBrowser } from "./functions"

export default function useMedia(fw, d, t, m) {
  const handleUpdate = useCallback(() => {
    if (isBrowser()) {
      if (window.innerWidth > desktop) {
        setCurrent(fw)
      } else if (window.innerWidth > tablet) {
        setCurrent(d)
      } else if (window.innerWidth > mobile) {
        setCurrent(t)
      } else setCurrent(m)
    }
  }, [fw, d, t, m])

  const [current, setCurrent] = useState(d)

  useEffect(() => {
    handleUpdate()
  }, [handleUpdate])

  useEffect(() => {
    if (isBrowser()) {
      window.addEventListener("resize", handleUpdate)
      return () => window.removeEventListener("resize", handleUpdate)
    }
  }, [handleUpdate])

  return current
}