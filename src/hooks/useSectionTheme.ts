import { useEffect } from 'react'

/**
 * Switches the page background to the colour of the section that is crossing
 * the middle of the viewport. Each `section[data-bg]` carries its background
 * colour in `data-bg`. (Accent colours are fixed: see index.css.)
 */
export function useSectionTheme() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[data-bg]')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document.body.style.setProperty('--bg', (e.target as HTMLElement).dataset.bg ?? '')
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sections.forEach((s) => io.observe(s))

    return () => {
      io.disconnect()
      document.body.style.removeProperty('--bg')
    }
  }, [])
}
