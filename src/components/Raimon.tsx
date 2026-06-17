/**
 * 雷文 (raimon) — the squared-spiral "thunder" meander that rims a ramen
 * bowl. Used as the break between sections: the page is a bowl, and each
 * band sits inside its rim. Rendered as a tiling SVG pattern so it stays
 * crisp at any width.
 *
 * `tone` matches the band colour of the section just below, so the rim
 * reads as that section's header; `accent` switches the key to lantern amber.
 */
import { useId } from 'react'

export function Raimon({
  tone = 'sumi',
  accent = 'red',
}: {
  tone?: 'sumi' | 'cha'
  accent?: 'red' | 'gold'
}) {
  const pid = useId().replace(/:/g, '')
  return (
    <div
      className={`raimon${tone === 'cha' ? ' on-cha' : ''}${accent === 'gold' ? ' gold' : ''}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 168 22" role="presentation">
        <defs>
          <pattern
            id={pid}
            width="24"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            {/* continuous top + bottom rails frame the band like a bowl rim,
                with an inward spiral hook hanging from each repeat */}
            <path
              d="M0 3 H24 M0 19 H24 M5 3 V15 H17 V8 H11"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </pattern>
        </defs>
        <rect width="168" height="22" fill={`url(#${pid})`} />
      </svg>
    </div>
  )
}
