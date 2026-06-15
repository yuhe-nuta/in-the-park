const LINKS = [
  { href: '#about', label: 'コンビ紹介' },
  { href: '#achievement', label: '実績' },
  { href: '#content', label: 'コンテンツ' },
  { href: '#sns', label: 'SNS' },
  { href: '#audience', label: '視聴者層' },
  { href: '#contact', label: 'お仕事のご依頼' },
  { href: '#', label: 'プライバシーポリシー' },
]

export function Footer() {
  return (
    <footer>
      <div className="footer-logo">インザパーク</div>
      <div className="footer-tag">ラーメン屋の師匠 – お笑いコンビ</div>
      <div className="footer-links">
        {LINKS.map((l, i) => (
          <a key={`${l.href}-${i}`} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
      <p className="footer-copy">© 2024 インザパーク All Rights Reserved.</p>
    </footer>
  )
}
