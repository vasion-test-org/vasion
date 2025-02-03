export const isBrowser = () => typeof window !== "undefined"

export const addDebouncedEventListener = (
  element,
  event,
  callback,
  delay
) => {
  let timeout

  const debouncedCallback = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(), delay)
  }
  element.addEventListener(event, debouncedCallback)
}

export const pxToVw = (px,  defaultWidth = 1600) => {
  if (isBrowser()) {
    const vw = px / window.innerWidth * 100
    return vw
  }
  return 0
}

export const vwToPx = (vw) => {
  if (isBrowser()) {
    const px = vw * (window.innerWidth / 100)
    return px
  }
  return 0
}

export const vhToPx = (vh) => {
  if (isBrowser()) {
    const px = vh * (window.innerHeight / 100)
    return px
  }
  return 0
}

/**
 * Add opacity to a Hex color. First, it converts the decimal opacity value into its equivalent in the range of 0-255, then it turns that value into hex and appends it to the color.
 * @param color - The hex color you want to add opacity to.
 * @param opacity - The decimal value for desired opacity.
 */
export const Opacity = (color, opacity) => {
  const valueInHexRange = ((opacity - 0) * (255 - 0)) / (1 - 0) + 0
  return (
    color + Number(Math.round(valueInHexRange)).toString(16)
  ).toUpperCase()
}

export const sleep = (ms) =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

export function pathnameMatches(pathA, pathB) {
  return pathA === pathB || pathA === `${pathB}/`
}

