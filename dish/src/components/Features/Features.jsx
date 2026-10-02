import './Features.css'

const features = [
  { number: '01', title: 'Market-led cooking', text: 'Our menu follows what is fresh, local, and in season.' },
  { number: '02', title: 'Made from scratch', text: 'House-made masalas, slow-cooked dals, zero shortcuts.' },
  { number: '03', title: 'A lighter footprint', text: 'Thoughtful portions and ingredients sourced close to home.' },
]

export default function Features() {
  return (
    <section className="features-section" id="story" aria-labelledby="features-title">
      <div className="features-intro">
        <span className="section-eyebrow">The Hara Bhara way</span>
        <h2 id="features-title">Rooted in tradition.<br /><em>Made for today.</em></h2>
      </div>
      <div className="features-list">
        {features.map((feature) => (
          <article className="feature-item" key={feature.number}>
            <span className="feature-number">{feature.number}</span>
            <div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
            <span className="feature-spark" aria-hidden="true">✳</span>
          </article>
        ))}
      </div>
    </section>
  )
}
