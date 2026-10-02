import './CategorySection.css'

const categoryDetails = [
  { id: 'all', label: 'Everything', mark: '✳' },
  { id: 'starters', label: 'Small plates', mark: '01' },
  { id: 'mains', label: 'Comfort bowls', mark: '02' },
  { id: 'south', label: 'South Indian', mark: '03' },
  { id: 'breads', label: 'From the tandoor', mark: '04' },
  { id: 'desserts', label: 'Something sweet', mark: '05' },
]

export default function CategorySection({ activeCategory, onSelect }) {
  return (
    <section className="category-section" aria-label="Browse menu categories">
      <div className="category-heading">
        <span>Find your craving</span>
        <span className="category-rule" />
      </div>
      <div className="category-list">
        {categoryDetails.map((category) => (
          <button
            className={`category-item${activeCategory === category.id ? ' is-active' : ''}`}
            key={category.id}
            type="button"
            aria-pressed={activeCategory === category.id}
            onClick={() => onSelect(category.id)}
          >
            <span className="category-mark" aria-hidden="true">{category.mark}</span>
            <span>{category.label}</span>
            <span className="category-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
    </section>
  )
}
