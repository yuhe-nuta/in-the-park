// Cloudflare Pages Function: お問い合わせフォームの内容を Resend 経由でメール通知する
// 必要な環境変数: RESEND_API_KEY(Secret), CONTACT_TO / CONTACT_FROM(任意)

interface Env {
  RESEND_API_KEY?: string
  CONTACT_TO?: string
  CONTACT_FROM?: string
}

const TYPES: Record<string, string> = {
  tieup: 'タイアップ動画',
  pr: 'PR投稿',
  event: 'イベント出演',
  other: 'その他',
}

const BUDGETS: Record<string, string> = {
  u50: '〜50万円',
  '50to100': '50〜100万円',
  o100: '100万円以上',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  })

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ')

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  let data: Record<string, unknown>
  try {
    data = await request.json()
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400)
  }

  // ハニーポット: 人には見えない欄が埋まっていたら、成功したように見せて送らない
  if (str(data.website, 200)) return json({ ok: true })

  const company = str(data.company, 100)
  const name = str(data.name, 100)
  const email = str(data.email, 200)
  const type = str(data.type, 20)
  const budget = str(data.budget, 20)
  const deadline = str(data.deadline, 100)
  const message = str(data.message, 5000)

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!company || !name || !emailOk || !TYPES[type] || !message || data.privacy !== true) {
    return json({ ok: false, error: 'invalid' }, 400)
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO) {
    return json({ ok: false, error: 'not_configured' }, 500)
  }

  const text = [
    `会社名: ${company}`,
    `氏名: ${name}`,
    `メールアドレス: ${email}`,
    `案件種別: ${TYPES[type]}`,
    `予算感: ${BUDGETS[budget] ?? '未定'}`,
    `希望納期: ${deadline || '未記入'}`,
    '',
    'メッセージ:',
    message,
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM || 'インザパーク お問い合わせ <onboarding@resend.dev>',
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: oneLine(`【お問い合わせ】${company} ${name} 様`),
      text,
    }),
  })

  if (!res.ok) return json({ ok: false, error: 'send_failed' }, 502)
  return json({ ok: true })
}
