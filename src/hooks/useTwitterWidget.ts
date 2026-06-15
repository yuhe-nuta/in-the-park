import { useEffect, type RefObject } from 'react'

const WIDGETS_SRC = 'https://platform.twitter.com/widgets.js'

declare global {
  interface Window {
    twttr?: {
      widgets: { load: (el?: HTMLElement) => void }
    }
  }
}

/**
 * Loads X (Twitter) widgets.js once and renders any embed markup (a
 * `.twitter-tweet` blockquote) found inside `ref`. Re-runs when `key` changes.
 * The script tag is shared across all callers.
 */
export function useTwitterWidget(
  ref: RefObject<HTMLElement | null>,
  key?: unknown,
) {
  useEffect(() => {
    const render = () => window.twttr?.widgets.load(ref.current ?? undefined)

    if (window.twttr?.widgets) {
      render()
      return
    }

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGETS_SRC}"]`,
    )
    if (!script) {
      script = document.createElement('script')
      script.src = WIDGETS_SRC
      script.async = true
      document.body.appendChild(script)
    }
    script.addEventListener('load', render)
    return () => script?.removeEventListener('load', render)
  }, [ref, key])
}
