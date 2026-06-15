import { useRef } from 'react'
import { useTwitterWidget } from '../hooks/useTwitterWidget'

/**
 * Embeds a single X (Twitter) post via the official widgets.js script.
 *
 * Progressive enhancement: the markup is a plain link to the post, so if the
 * script is blocked it stays a working link. Once widgets.js loads it swaps the
 * blockquote for the live post. `id` is the numeric status id.
 */
export function Tweet({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useTwitterWidget(ref, id)

  return (
    <div className="x-tweet" ref={ref}>
      <blockquote className="twitter-tweet" data-theme="light" data-dnt="true">
        <a href={`https://twitter.com/rameninthepark/status/${id}`}>
          ポストを読み込み中…
        </a>
      </blockquote>
    </div>
  )
}
