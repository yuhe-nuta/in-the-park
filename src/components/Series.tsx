import duoRamenA from '../assets/duo-ramen-a.jpg'
import duoRamenB from '../assets/duo-ramen-b.jpg'

export function Series() {
  return (
    <section id="series" className="sec gutter" data-bg="#F8F0E3">
      <div className="inner">
        <p className="eyebrow rv">代表的シリーズ</p>
        <div className="series rv">
          <div className="noren" aria-hidden="true">
            <span>ラ</span>
            <span>ー</span>
            <span>メ</span>
            <span>ン</span>
          </div>
          <div className="series-photo">
            <img src={duoRamenA} alt="ラーメン屋の師匠と弟子に扮したふたり。師匠は腕を組んで不機嫌な顔をしている" loading="lazy" />
            <img className="swap" src={duoRamenB} alt="" aria-hidden="true" loading="lazy" />
          </div>
          <div className="series-text">
            <h3>ラーメン屋の師匠</h3>
            <p>
              ラーメン屋を舞台にした30〜60秒のショートコント。
              <br />
              偏屈な師匠と、真面目な弟子と、時々やってくる迷惑客。
              <br />
              YouTube ShortsとTikTokで公開しています。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
