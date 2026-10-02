import './DishCard.css'

export default function DishCard({ dish, quantity = 0, onAdd, onIncrease, onDecrease }) {
  return (
    <article className="dish-card">
      <div className="dish-photo">
        <img src={dish.image} alt={dish.name} loading="lazy" />
        <span className="dish-veg" aria-label="Vegetarian"><span /></span>
      </div>
      <div className="dish-details">
        <div className="dish-title-line">
          <h3>{dish.name}</h3>
          <span className="dish-price">₹{dish.price}</span>
        </div>
        <p className="dish-description">{dish.description}</p>
        <div className="dish-card-bottom">
          <span className="dish-spice" aria-label={`Spice level ${dish.spice} of 3`}>
            {[0, 1, 2].map((level) => <i className={level < dish.spice ? 'hot' : ''} key={level} />)}
          </span>
          {quantity > 0 ? (
            <div className="dish-quantity">
              <button type="button" onClick={onDecrease} aria-label={`Remove one ${dish.name}`}>−</button>
              <span>{quantity}</span>
              <button type="button" onClick={onIncrease} aria-label={`Add one ${dish.name}`}>+</button>
            </div>
          ) : (
            <button className="dish-add" type="button" onClick={onAdd}>Add to bag <span aria-hidden="true">+</span></button>
          )}
        </div>
      </div>
    </article>
  )
}
