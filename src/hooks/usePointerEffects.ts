import { useEffect } from 'react'

/**
 * Fine-pointer-only effects: a cursor follower that grows over links and
 * buttons, magnetic buttons (`.mag`) and tilting cards (`.tilt`). Skipped on
 * touch devices and when the user prefers reduced motion.
 */
export function usePointerEffects() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const ac = new AbortController()
    const { signal } = ac
    const cursor = document.querySelector<HTMLElement>('.cursor')
    let raf = 0

    if (cursor) {
      let cx = 0
      let cy = 0
      let tx = 0
      let ty = 0
      window.addEventListener(
        'pointermove',
        (e) => {
          tx = e.clientX
          ty = e.clientY
          cursor.classList.add('on')
        },
        { signal },
      )
      const loop = () => {
        cx += (tx - cx) * 0.2
        cy += (ty - cy) * 0.2
        cursor.style.transform = `translate(${cx - cursor.offsetWidth / 2}px, ${cy - cursor.offsetHeight / 2}px)`
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)

      document
        .querySelectorAll<HTMLElement>('a, button')
        .forEach((el) => {
          el.addEventListener('pointerenter', () => cursor.classList.add('big'), { signal })
          el.addEventListener('pointerleave', () => cursor.classList.remove('big'), { signal })
        })
    }

    document.querySelectorAll<HTMLElement>('.mag').forEach((el) => {
      el.addEventListener(
        'pointermove',
        (e) => {
          const r = el.getBoundingClientRect()
          const dx = (e.clientX - r.left - r.width / 2) * 0.25
          const dy = (e.clientY - r.top - r.height / 2) * 0.35
          el.style.transform = `translate(${dx}px, ${dy}px)`
        },
        { signal },
      )
      el.addEventListener('pointerleave', () => (el.style.transform = ''), { signal })
    })

    document.querySelectorAll<HTMLElement>('.tilt').forEach((el) => {
      el.addEventListener(
        'pointermove',
        (e) => {
          const r = el.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5
          const py = (e.clientY - r.top) / r.height - 0.5
          el.style.setProperty('--ry', `${px * 8}deg`)
          el.style.setProperty('--rx', `${-py * 8}deg`)
        },
        { signal },
      )
      el.addEventListener(
        'pointerleave',
        () => {
          el.style.setProperty('--ry', '0deg')
          el.style.setProperty('--rx', '0deg')
        },
        { signal },
      )
    })

    return () => {
      ac.abort()
      cancelAnimationFrame(raf)
    }
  }, [])
}
