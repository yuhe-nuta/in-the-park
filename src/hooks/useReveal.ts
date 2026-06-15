import { useEffect } from 'react'

/**
 * Ports the prototype's progressive-enhancement reveal behaviour:
 *  - `.fi` elements fade/slide in once they scroll into view (with a
 *    timeout fallback so nothing stays hidden in short viewports).
 *  - `.bar-fill[data-w]` bars animate to their target width when their
 *    `.aud-card` enters view.
 *
 * Runs once after mount; observers are torn down on unmount.
 */
export function useReveal() {
  useEffect(() => {
    const fadeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('vis')
            fadeObs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.fi').forEach((el) => fadeObs.observe(el))

    // Fallback: ensure all .fi become visible even in constrained viewports.
    const fallback = window.setTimeout(() => {
      document
        .querySelectorAll('.fi:not(.vis)')
        .forEach((el) => el.classList.add('vis'))
    }, 400)

    const barObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target
              .querySelectorAll<HTMLElement>('.bar-fill[data-w]')
              .forEach((bar) => {
                bar.style.width = `${bar.dataset.w}%`
              })
            barObs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.3 },
    )
    document.querySelectorAll('.aud-card').forEach((el) => barObs.observe(el))

    return () => {
      fadeObs.disconnect()
      barObs.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])
}
