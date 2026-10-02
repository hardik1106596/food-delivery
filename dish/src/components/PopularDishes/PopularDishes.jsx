import DishCard from '../DishCard/DishCard.jsx'
import './PopularDishes.css'

export default function PopularDishes({ dishes, cart, onAdd, onIncrease, onDecrease }) {
  return (
    <section className="popular-section" id="menu" aria-labelledby="popular-title">
      <div className="popular-heading">
        <div>
          <span className="section-eyebrow">Made with care, served with joy</span>
          <h2 id="popular-title">A few house <em>favourites.</em></h2>
        </div>
        <span className="popular-count">{dishes.length.toString().padStart(2, '0')} dishes</span>
      </div>
      {dishes.length ? (
        <div className="popular-grid">
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              quantity={cart[dish.id]?.quantity || 0}
              onAdd={() => onAdd(dish)}
              onIncrease={() => onIncrease(dish.id)}
              onDecrease={() => onDecrease(dish.id)}
            />
          ))}
        </div>
      ) : (
        <p className="popular-empty">Nothing on this menu just yet. Try another category.</p>
      )}
    </section>
  )
}
