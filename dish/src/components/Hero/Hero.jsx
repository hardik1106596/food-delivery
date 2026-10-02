import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker"><span /> Fresh from our kitchen</p>
        <h1 id="hero-title">A little more<br /> <em>green</em> in every day.</h1>
        <p className="hero-description">
          Indian comfort food, made with seasonal produce and a generous spoonful of care.
        </p>
        <a className="hero-cta" href="#menu">Explore the menu <span aria-hidden="true">↘</span></a>
        <div className="hero-note"><strong>100%</strong><span>vegetarian kitchen<br />cooked fresh daily</span></div>
      </div>
      <div className="hero-image" role="img" aria-label="A colourful vegetarian Indian thali">
        <span className="hero-image-tag">Good food, good mood</span>
      </div>
      <div className="hero-index" aria-hidden="true">01 / 03</div>
    </section>
  )
}
