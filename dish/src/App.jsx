import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import CategoryTabs from './components/CategoryTabs.jsx'
import MenuGrid from './components/MenuGrid.jsx'
import Cart from './components/Cart.jsx'
import { categories, dishes } from './data/dishes.js'

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)

  const visibleDishes = useMemo(() => {
    if (activeCategory === 'all') return dishes
    return dishes.filter((d) => d.category === activeCategory)
  }, [activeCategory])

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )

  function addToCart(dish) {
    setCart((prev) => ({
      ...prev,
      [dish.id]: prev[dish.id]
        ? { ...prev[dish.id], quantity: prev[dish.id].quantity + 1 }
        : { ...dish, quantity: 1 },
    }))
  }

  function increase(id) {
    setCart((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantity: prev[id].quantity + 1 },
    }))
  }

  function decrease(id) {
    setCart((prev) => {
      const item = prev[id]
      if (!item) return prev
      if (item.quantity <= 1) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: { ...item, quantity: item.quantity - 1 } }
    })
  }

  return (
    <div className="app">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <CategoryTabs
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      <MenuGrid
        dishes={visibleDishes}
        cart={cart}
        onAdd={addToCart}
        onIncrease={increase}
        onDecrease={decrease}
      />

      <footer className="site-footer">
        <p>Hara Bhara · 100% Vegetarian · Made with React + Vite</p>
      </footer>

      {cartOpen && (
        <Cart
          cart={cart}
          onClose={() => setCartOpen(false)}
          onIncrease={increase}
          onDecrease={decrease}
        />
      )}
    </div>
  )
}
