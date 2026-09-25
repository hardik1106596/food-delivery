export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="tabs">
      <button
        className={`tab ${active === 'all' ? 'active' : ''}`}
        onClick={() => onChange('all')}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`tab ${active === cat.id ? 'active' : ''}`}
          onClick={() => onChange(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
