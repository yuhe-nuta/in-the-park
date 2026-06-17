import { useEffect, useRef, useState } from 'react'

/**
 * Counts a number up from 0 to `target` once its element scrolls into view —
 * the view-count is the pitch, so it earns the animation. Honours
 * `prefers-reduced-motion` (jumps straight to the final value) and keeps the
 * given number of decimals so figures like 2.9 / 12.9 land exactly.
 *
 * Returns a ref to attach to the element and the current display string.
 */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useCountUp<T extends HTMLElement = HTMLElement>(
  target: number,
  decimals = 0,
  duration = 1400,
) {
  const ref = useRef<T | null>(null)
  // Reduced motion: start at the final value so the effect never needs to
  // call setState synchronously to "catch up".
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0))
  const done = useRef(prefersReducedMotion())

  useEffect(() => {
    const el = ref.current
    if (!el || done.current) return

    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(target * eased)
        if (t < 1) requestAnimationFrame(tick)
        else setValue(target)
      }
      requestAnimationFrame(tick)
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done.current) {
            done.current = true
            run()
            obs.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return { ref, display: value.toFixed(decimals) }
}
