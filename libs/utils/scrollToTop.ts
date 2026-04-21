const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

const scrollToTop = () => {
  const root = document.scrollingElement ?? document.documentElement
  const startTop = root.scrollTop

  if (startTop <= 0) {
    return
  }

  const duration = 500
  const startTime = performance.now()

  const step = (currentTime: number) => {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    const easedProgress = easeOutCubic(progress)

    root.scrollTop = startTop * (1 - easedProgress)

    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
}

export default scrollToTop
