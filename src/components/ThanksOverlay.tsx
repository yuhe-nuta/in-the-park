import { useEffect } from 'react'

export function ThanksOverlay({
  show,
  onClose,
}: {
  show: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!show) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [show, onClose])

  return (
    <div
      id="thanks"
      className={show ? 'show' : ''}
      role="dialog"
      aria-modal="true"
      aria-labelledby="thanks-ttl"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="thanks-box">
        <div className="thanks-icon">🍜</div>
        <h2 className="thanks-ttl" id="thanks-ttl">
          お問い合わせありがとうございます！
        </h2>
        <p className="thanks-txt">
          3営業日以内にご連絡いたします。
          <br />
          しばらくお待ちください。
        </p>
        <button className="btn btn-red" onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  )
}
