import { useEffect } from 'react'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * One rAF-throttled scroll listener that drives:
 *  - the top progress bar (`.progress i`, --p)
 *  - hide-on-scroll for the fixed header (`#main-nav`, `.hide`)
 *  - the hero parallax offset (`#hero`, --py)
 *  - the history timeline's drawn line (`#tl`, --tp)
 */
export function useScrollEffects() {
  useEffect(() => {
    const reduce = prefersReducedMotion()
    const bar = document.querySelector<HTMLElement>('.progress i')
    const nav = document.getElementById('main-nav')
    const hero = document.getElementById('hero')
    const tl = document.getElementById('tl')
    let last = 0
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar?.style.setProperty('--p', String(max > 0 ? y / max : 0))
      nav?.classList.toggle('hide', y > last && y > 160)
      last = y
      if (hero && !reduce) {
        hero.style.setProperty('--py', `${Math.min(y, 800) * 0.3}px`)
      }
      if (tl) {
        const r = tl.getBoundingClientRect()
        const p = (window.innerHeight * 0.65 - r.top) / r.height
        tl.style.setProperty('--tp', String(Math.max(0, Math.min(1, p))))
      }
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}
