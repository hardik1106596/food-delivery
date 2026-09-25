export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="site-header">
      <div className="brand">
        <div className="brand-mark">
          <span className="leaf-dot" />
          <h1>Hara Bhara</h1>
        </div>
        <p>Pure Vegetarian Kitchen</p>
      </div>

      <button className="cart-button" onClick={onCartClick}>
        🛒 Cart
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </button>
    </header>
  )
}
