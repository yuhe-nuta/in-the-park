import { useRef, useState } from 'react'
import { ThanksOverlay } from './ThanksOverlay'

const CASES = [
  'タイアップ動画制作',
  'SNS PR投稿',
  'イベント・ライブ出演',
  'テレビ・ラジオ出演',
  'コラボ企画',
  'その他ご相談',
]

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [showThanks, setShowThanks] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    let valid = true
    let firstInvalid: HTMLElement | null = null

    form
      .querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        '[required]',
      )
      .forEach((field) => {
        const empty =
          field instanceof HTMLInputElement && field.type === 'checkbox'
            ? !field.checked
            : !field.value.trim()
        if (empty) {
          valid = false
          if (!firstInvalid) firstInvalid = field
          field.classList.add('invalid')
          field.addEventListener(
            'input',
            () => field.classList.remove('invalid'),
            { once: true },
          )
        }
      })

    if (valid) {
      setShowThanks(true)
      form.reset()
    } else if (firstInvalid) {
      const nav = document.getElementById('main-nav')
      const navH = nav ? nav.offsetHeight : 0
      const top =
        (firstInvalid as HTMLElement).getBoundingClientRect().top +
        window.scrollY -
        navH -
        20
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="contact">
      <div className="inner">
        <p className="eyebrow fi">ご注文承ります</p>
        <h2 className="sec-title fi">お仕事のご依頼</h2>
        <div className="contact-layout">
          <div className="fi">
            <p className="contact-side-ttl">承れるお仕事</p>
            <div className="cases">
              {CASES.map((c) => (
                <div className="case" key={c}>
                  <div className="case-dot" />
                  {c}
                </div>
              ))}
            </div>
          </div>
          <form
            ref={formRef}
            className="order-slip fi d1"
            noValidate
            onSubmit={handleSubmit}
          >
            <p className="order-slip-head">ご注文票（お見積り・ご相談は無料）</p>
            <div className="form-row2">
              <div className="fg">
                <label htmlFor="f-company">
                  会社名<span className="req">必須</span>
                </label>
                <input
                  type="text"
                  id="f-company"
                  name="company"
                  className="fi-ctrl"
                  placeholder="株式会社〇〇"
                  required
                />
              </div>
              <div className="fg">
                <label htmlFor="f-name">
                  氏名<span className="req">必須</span>
                </label>
                <input
                  type="text"
                  id="f-name"
                  name="name"
                  className="fi-ctrl"
                  placeholder="山田 太郎"
                  required
                />
              </div>
            </div>
            <div className="fg">
              <label htmlFor="f-email">
                メールアドレス<span className="req">必須</span>
              </label>
              <input
                type="email"
                id="f-email"
                name="email"
                className="fi-ctrl"
                placeholder="info@example.com"
                required
              />
            </div>
            <div className="fg">
              <label htmlFor="f-type">
                案件種別<span className="req">必須</span>
              </label>
              <select id="f-type" name="type" className="fi-ctrl" required>
                <option value="">選択してください</option>
                <option value="tieup">タイアップ動画</option>
                <option value="pr">PR投稿</option>
                <option value="event">イベント出演</option>
                <option value="other">その他</option>
              </select>
            </div>
            <div className="form-row2">
              <div className="fg">
                <label htmlFor="f-budget">
                  予算感<span className="opt">任意</span>
                </label>
                <select id="f-budget" name="budget" className="fi-ctrl">
                  <option value="">未定</option>
                  <option value="u50">〜50万円</option>
                  <option value="50to100">50〜100万円</option>
                  <option value="o100">100万円以上</option>
                </select>
              </div>
              <div className="fg">
                <label htmlFor="f-deadline">
                  希望納期<span className="opt">任意</span>
                </label>
                <input
                  type="text"
                  id="f-deadline"
                  name="deadline"
                  className="fi-ctrl"
                  placeholder="例：2025年3月まで"
                />
              </div>
            </div>
            <div className="fg">
              <label htmlFor="f-msg">
                メッセージ<span className="req">必須</span>
              </label>
              <textarea
                id="f-msg"
                name="message"
                className="fi-ctrl"
                placeholder="ご依頼の概要・背景・ご希望などをご記入ください"
                required
              />
            </div>
            <div className="privacy-row">
              <input type="checkbox" id="f-privacy" name="privacy" required />
              <label htmlFor="f-privacy">
                <a
                  href="#"
                  className="privacy-link"
                  onClick={(e) => e.preventDefault()}
                >
                  プライバシーポリシー
                </a>
                に同意する
              </label>
            </div>
            <button type="submit" className="btn btn-red btn-submit">
              送信する →
            </button>
          </form>
        </div>
      </div>
      <ThanksOverlay show={showThanks} onClose={() => setShowThanks(false)} />
    </section>
  )
}
