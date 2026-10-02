import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import Hero from '../components/Hero/Hero.jsx'
import CategorySection from '../components/CategorySection/CategorySection.jsx'
import PopularDishes from '../components/PopularDishes/PopularDishes.jsx'
import Features from '../components/Features/Features.jsx'
import Footer from '../components/Footer/Footer.jsx'
import { dishes } from '../data/dishes.js'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './Home.css'


export default function Home()
{
  const navigate = useNavigate()
  
  const [activeCategory, setActiveCategory] = useState('all')
  const [cartOpen, setCartOpen] = useState(false)

  const {
    cart,
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    increase,
    decrease,
  } = useCart()

  const visibleDishes = useMemo(
    () =>
      activeCategory === 'all'
        ? dishes
        : dishes.filter(
          (dish) => dish.category === activeCategory
        ),
    [activeCategory]
  )



  return (
    <div className="home-page">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <CategorySection activeCategory={activeCategory} onSelect={setActiveCategory} />
        <PopularDishes
          dishes={visibleDishes}
          cart={cart}
          onAdd={addToCart}
          onIncrease={increase}
          onDecrease={decrease}
        />
        <Features />
      </main>
      <Footer />
      {cartOpen && (
        <div className="cart-layer">
          <button className="cart-backdrop" type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} />
          <aside className="cart-panel" aria-labelledby="cart-title" aria-modal="true" role="dialog">
            <div className="cart-panel-heading">
              <div><span className="section-eyebrow">Fresh choices</span><h2 id="cart-title">Your bag</h2></div>
              <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)}>×</button>
            </div>
            <div className="cart-panel-items">
              {cartItems.length === 0 ? <p className="cart-empty">Your bag is waiting for something lovely.</p> : cartItems.map((item) => (
                <div className="cart-panel-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="cart-panel-info"><strong>{item.name}</strong><span>₹{item.price} · Qty {item.quantity}</span></div>
                  <div className="cart-item-controls">
                    <button type="button" onClick={() => decrease(item.id)} aria-label={`Remove one ${item.name}`}>−</button>
                    <button type="button" onClick={() => increase(item.id)} aria-label={`Add one ${item.name}`}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-panel-footer">
              <div><span>Subtotal</span><strong>₹{cartTotal}</strong></div>
              <button
                type="button"
                disabled={!cartCount}
                onClick={() => {
                  setCartOpen(false)
                  navigate('/checkout')
                }}
              >
                Continue to checkout <span aria-hidden="true">→</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
