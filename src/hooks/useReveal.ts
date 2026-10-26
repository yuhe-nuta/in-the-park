import { useEffect } from 'react'

/**
 * Scroll-triggered reveal. `.rv` elements fade/slide in once they enter the
 * viewport (the `.in` class also triggers the highlighter `.mk` underline
 * inside them). The hidden start state only applies under `.js-e`, which
 * main.tsx sets before first paint, so nothing is hidden without JS.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.rv')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('in')
          io.unobserve(e.target)
        })
      },
      { threshold: 0.18 },
    )
    els.forEach((el) => io.observe(el))

    // Safety net: never leave content hidden if an observer callback is missed.
    const fallback = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>('.rv:not(.in)')
        .forEach((el) => {
          const r = el.getBoundingClientRect()
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in')
        })
    }, 1200)

    return () => {
      io.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])
}
