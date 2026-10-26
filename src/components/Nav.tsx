import { useState } from 'react'

const LINKS = [
  { href: '#stats', label: '実績' },
  { href: '#profile', label: 'プロフィール' },
  { href: '#history', label: '歩み' },
  { href: '#series', label: 'ラーメン屋の師匠' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header id="main-nav" className="gutter">
      <div className="nav-inner">
        <a href="#top" className="logo" aria-label="インザパーク トップへ">
          インザパーク
        </a>
        <nav className="nav-links" aria-label="メニュー">
          {LINKS.map((l) => (
            <a key={l.href} className="l" href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="btn sm mag" href="#contact">
            お仕事のご依頼
          </a>
        </nav>
        <button
          className="nav-burger"
          aria-label="メニューを開く"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav className={`nav-mobile${open ? ' open' : ''}`} aria-label="モバイルメニュー">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          お仕事のご依頼
        </a>
      </nav>
    </header>
  )
}
