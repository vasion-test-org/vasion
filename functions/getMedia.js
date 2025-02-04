import { desktop, tablet, mobile } from "@/styles/media"

export default function getMedia(fw, d, t, m) {
  if (typeof window !== "undefined") {
    if (window.innerWidth > desktop) {
      return fw
    }
    if (window.innerWidth > tablet) {
      return d
    }
    if (window.innerWidth > mobile) {
      return t
    }
    if (window.innerWidth <= mobile) {
      return m
    }
  }

  return d
}