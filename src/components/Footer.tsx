const LINKS = [
  { href: '#stats', label: '実績' },
  { href: '#profile', label: 'プロフィール' },
  { href: '#history', label: '歩み' },
  { href: '#videos', label: '動画' },
  { href: '#contact', label: 'お仕事のご依頼' },
]

export function Footer() {
  return (
    <footer className="gutter">
      <div className="inner foot-in">
        <div className="footer-logo">インザパーク</div>
        <div className="footer-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <p className="footer-copy">© インザパーク</p>
      </div>
    </footer>
  )
}
