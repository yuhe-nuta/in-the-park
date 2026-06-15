import { useEffect, useRef, type MouseEvent } from 'react'

/**
 * Drives a seamless, auto-scrolling horizontal marquee that is also
 * drag/swipe-able.
 *
 * Render the items **twice** inside `trackRef`; the hook translates the track
 * leftward at `speed` px/frame and wraps by one copy's width so the loop is
 * seamless. Pointer drag moves the track directly and pauses the auto-scroll.
 *
 * `onClickCapture` must be spread on the track: if the last interaction was a
 * real drag (moved past a small threshold) it swallows the click so cards
 * aren't accidentally activated when the user was just swiping.
 *
 * Respects `prefers-reduced-motion`: no auto-scroll, but drag still works.
 */
export function useDragMarquee(speed = 0.4) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const draggedRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let offset = 0
    let half = track.scrollWidth / 2
    let dragging = false
    let lastX = 0
    let moved = 0
    let raf = 0

    const measure = () => {
      half = track.scrollWidth / 2
    }
    const ro = new ResizeObserver(measure)
    ro.observe(track)

    const apply = () => {
      if (half > 0) {
        while (offset <= -half) offset += half
        while (offset > 0) offset -= half
      }
      track.style.transform = `translate3d(${offset}px, 0, 0)`
    }

    const step = () => {
      if (!dragging) offset -= speed
      apply()
      raf = requestAnimationFrame(step)
    }
    if (reduce) apply()
    else raf = requestAnimationFrame(step)

    // Note: we deliberately avoid setPointerCapture here. Capturing on the
    // container retargets the subsequent `click` to the container, which
    // swallows the native navigation of the child <a>. Instead we listen for
    // move/up on `window` while a drag is active; touch pointers keep firing at
    // their origin element and bubble up, so dragging still works everywhere.
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      lastX = e.clientX
      offset += dx
      moved += Math.abs(dx)
      if (reduce) apply()
    }
    const onUp = () => {
      if (!dragging) return
      dragging = false
      if (moved > 6) draggedRef.current = true
      container.classList.remove('dragging')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
    const onDown = (e: PointerEvent) => {
      dragging = true
      moved = 0
      lastX = e.clientX
      draggedRef.current = false
      container.classList.add('dragging')
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
    }

    container.addEventListener('pointerdown', onDown)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      container.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [speed])

  const onClickCapture = (e: MouseEvent) => {
    if (draggedRef.current) {
      e.preventDefault()
      e.stopPropagation()
      draggedRef.current = false
    }
  }

  return { containerRef, trackRef, onClickCapture }
}
