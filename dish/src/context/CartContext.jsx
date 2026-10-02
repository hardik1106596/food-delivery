import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState({})

  function addToCart(dish) {
    setCart((current) => ({
      ...current,
      [dish.id]: current[dish.id]
        ? {
            ...current[dish.id],
            quantity: current[dish.id].quantity + 1,
          }
        : {
            ...dish,
            quantity: 1,
          },
    }))
  }

  function increase(id) {
    setCart((current) => ({
      ...current,
      [id]: {
        ...current[id],
        quantity: current[id].quantity + 1,
      },
    }))
  }

  function decrease(id) {
    setCart((current) => {
      const item = current[id]

      if (!item) return current

      if (item.quantity === 1) {
        const next = { ...current }
        delete next[id]
        return next
      }

      return {
        ...current,
        [id]: {
          ...item,
          quantity: item.quantity - 1,
        },
      }
    })
  }

  const cartItems = Object.values(cart)

  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [cartItems]
  )

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  )

  const value = {
    cart,
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    increase,
    decrease,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
