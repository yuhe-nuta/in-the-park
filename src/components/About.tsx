import teradaPhoto from '../assets/terada.png'
import yoshiakiPhoto from '../assets/yoshiaki.png'

const MEMBERS = [
  {
    role: 'ボケ / 師匠役',
    name: 'チャドゥリ',
    kana: 'チャ  ドゥリ',
    bio: 'ボケ担当。水戸在籍時には「J2最速」とも称されたスピードが持ち味。50mを5.8秒で走る韋駄天。学生時代のあだ名は「プリウス」。',
    // bio: 'インザパークのボケ担当。独特のテンポと予測不能な「師匠ロジック」で観客の笑いを引き出す。M-1グランプリにも複数回出場。見た目のギャップが魅力。',
    photo: teradaPhoto,
    delay: 'd1',
  },
  {
    role: 'ツッコミ / 弟子役',
    name: 'ムギさん',
    kana: 'ムギ サン',
    bio: 'ツッコミ担当。実はサッカー担当といえばムギ。ボードゲーム担当もムギ。体調不良担当もムギ。学生時代のあだ名は「地蔵」。',
    // bio: 'インザパークのツッコミ担当。鋭いリアクションと共感力の高い「弟子目線」で師匠の無茶振りをすべて受け止める。ショートコントとの相性が抜群。',
    photo: yoshiakiPhoto,
    delay: 'd2',
  },
]

export function About() {
  return (
    <section id="about">
      <div className="inner">
        <p className="eyebrow fi">About</p>
        <h2 className="sec-title fi">コンビ紹介</h2>
        <p className="sec-lead fi">
          ラーメン屋の「師匠」と「弟子」という設定で繰り広げるショートコント。
          一見ありそうな日常の中に仕込まれたシュールな笑いが、
          幅広い世代に支持されています。
        </p>
        <div className="members-grid">
          {MEMBERS.map((m) => (
            <div key={m.name} className={`member-card fi ${m.delay}`}>
              <div className="member-photo">
                <img src={m.photo} alt={m.name} className="member-photo-img" />
              </div>
              <div className="member-body">
                <div className="member-role">{m.role}</div>
                <div className="member-name">{m.name}</div>
                <div className="member-kana">{m.kana}</div>
                <p className="member-bio">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
