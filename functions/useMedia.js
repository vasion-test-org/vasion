'use client'
import { useCallback, useEffect, useState } from "react"
import { desktop, tablet, mobile } from "@/styles/media"
import { isBrowser } from "./functions"

export default function useMedia(fw, d, t, m) {
  const [current, setCurrent] = useState(() => {
    if (!isBrowser()) return d; // Ensure this doesn't run on SSR
    if (window.innerWidth > desktop) return fw;
    if (window.innerWidth > tablet) return d;
    if (window.innerWidth > mobile) return t;
    return m;
  });

  const handleUpdate = useCallback(() => {
    if (!isBrowser()) return;

    let newValue;
    if (window.innerWidth > desktop) {
      newValue = fw;
    } else if (window.innerWidth > tablet) {
      newValue = d;
    } else if (window.innerWidth > mobile) {
      newValue = t;
    } else {
      newValue = m;
    }

    // Prevent unnecessary state updates (which cause unmount/remount issues)
    setCurrent((prev) => (prev !== newValue ? newValue : prev));
  }, [fw, d, t, m]);

  useEffect(() => {
    if (isBrowser()) {
      window.addEventListener("resize", handleUpdate);
      return () => window.removeEventListener("resize", handleUpdate);
    }
  }, [handleUpdate]);

  return current;
}
