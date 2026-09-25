export default function DishCard({ dish, quantity, onAdd, onIncrease, onDecrease }) {
  return (
    <article className="dish-card">
      <div className="dish-image-wrap">
        <img src={dish.image} alt={dish.name} loading="lazy" />
        <span className="veg-badge">
          <span />
        </span>
      </div>

      <div className="dish-body">
        <div className="dish-title-row">
          <h3>{dish.name}</h3>
          <span className="dish-price">₹{dish.price}</span>
        </div>

        <p className="dish-desc">{dish.description}</p>

        <div className="dish-footer">
          <div className="spice-dots" title="Spice level">
            {[0, 1, 2].map((i) => (
              <span key={i} className={i < dish.spice ? 'on' : ''} />
            ))}
          </div>

          {quantity > 0 ? (
            <div className="qty-control">
              <button onClick={onDecrease} aria-label="Decrease quantity">
                −
              </button>
              <span>{quantity}</span>
              <button onClick={onIncrease} aria-label="Increase quantity">
                +
              </button>
            </div>
          ) : (
            <button className="add-btn" onClick={onAdd}>
              Add
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
