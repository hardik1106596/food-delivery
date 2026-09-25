export default function Cart({ cart, onClose, onIncrease, onDecrease }) {
  const items = Object.values(cart)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="cart-drawer">
        <div className="cart-header">
          <h2>Your Order</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 && (
            <div className="empty-state">Your cart is empty. Add a few dishes!</div>
          )}

          {items.map((item) => (
            <div className="cart-line" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-line-info">
                <strong>{item.name}</strong>
                <span className="line-price">
                  ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                </span>
              </div>
              <div className="qty-control">
                <button onClick={() => onDecrease(item.id)} aria-label="Decrease quantity">
                  −
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrease(item.id)} aria-label="Increase quantity">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="cart-total-row">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button className="checkout-btn" disabled={items.length === 0}>
            Place Order
          </button>
        </div>
      </aside>
    </>
  )
}
