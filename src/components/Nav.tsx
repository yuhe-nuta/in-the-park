import { useState } from 'react'

const LINKS = [
  { href: '#about', label: 'コンビ紹介', mobileLabel: 'コンビ紹介' },
  { href: '#achievement', label: '実績', mobileLabel: '実績・受賞歴' },
  { href: '#content', label: 'コンテンツ', mobileLabel: 'コンテンツ' },
  { href: '#sns', label: 'SNS', mobileLabel: 'SNS実績' },
  { href: '#audience', label: '視聴者層', mobileLabel: '視聴者層' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav id="main-nav">
      <div className="nav-stripe" />
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          インザパーク
        </a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta">
              お仕事のご依頼
            </a>
          </li>
        </ul>
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
      <nav className={`nav-mobile${open ? ' open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.mobileLabel}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          お仕事のご依頼
        </a>
      </nav>
    </nav>
  )
}
