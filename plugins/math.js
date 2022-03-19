export const lerp = (a, b, n) => (1 - n) * a + n * b

export const clamp = (val, min, max) => {
  const minVal = Math.min(val, min)

  return Math.max(minVal, max)
}
