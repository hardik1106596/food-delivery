import DishCard from './DishCard.jsx'

export default function MenuGrid({ dishes, cart, onAdd, onIncrease, onDecrease }) {
  if (dishes.length === 0) {
    return <div className="empty-state">No dishes found in this category yet.</div>
  }

  return (
    <div className="menu-grid">
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
  )
}
