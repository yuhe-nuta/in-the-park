import { useEffect } from 'react'

/**
 * Intercepts in-page anchor clicks and scrolls smoothly to the target,
 * offset by the sticky nav height (matches the prototype's behaviour and
 * avoids the heading hiding behind the nav).
 */
export function useAnchorScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      const nav = document.getElementById('main-nav')
      const navH = nav ? nav.offsetHeight : 0
      const top =
        target.getBoundingClientRect().top + window.scrollY - navH - 8
      window.scrollTo({ top, behavior: 'smooth' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
