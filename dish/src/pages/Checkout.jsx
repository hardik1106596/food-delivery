import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './Checkout.css'

export default function Checkout() {
  const navigate = useNavigate()

  const { cartItems, cartTotal } = useCart()

  const delivery = 40
  const taxes = Math.round(cartTotal * 0.05)
  const total = cartTotal + delivery + taxes

  async function handlePayment() {
    try {
      // 1. Create Razorpay order
      const response = await fetch(
        'http://localhost:5000/api/payment/create-order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: total,
          }),
        }
      )

      const order = await response.json()

      if (!response.ok) {
        throw new Error(
          order.message || 'Failed to create order'
        )
      }

      console.log('✅ Razorpay order created:', order)

      // 2. Get registered customer
      const registeredUser = JSON.parse(
        localStorage.getItem('haraBharaUser')
      )

      const loggedInUser = JSON.parse(
        localStorage.getItem('haraBharaLoggedIn')
      )

      if (!registeredUser) {
        alert('Please register and login before payment.')
        return
      }

      const customer = {
        name:
          loggedInUser?.name ||
          registeredUser.name,

        email:
          loggedInUser?.email ||
          registeredUser.email,

        phone: registeredUser.phone,
      }

      console.log('👤 Customer:', customer)

      // 3. Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: 'Hara Bhara',

        description: 'Food Order',

        order_id: order.id,

        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },

        theme: {
          color: '#1f6b45',
        },

        // 4. Razorpay successful payment
        handler: async function (paymentResponse) {
          console.log('================================')
          console.log('✅ PAYMENT SUCCESSFUL')
          console.log('Payment response:', paymentResponse)
          console.log('================================')

          try {
            // 5. Send payment details to backend
            console.log('📤 Sending payment for verification...')

            const verifyResponse = await fetch(
              'http://localhost:5000/api/payment/verify',
              {
                method: 'POST',

                headers: {
                  'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                  razorpay_order_id:
                    paymentResponse.razorpay_order_id,

                  razorpay_payment_id:
                    paymentResponse.razorpay_payment_id,

                  razorpay_signature:
                    paymentResponse.razorpay_signature,

                  customer: customer,
                }),
              }
            )

            console.log(
              'Backend status:',
              verifyResponse.status
            )

            const result = await verifyResponse.json()

            console.log(
              'Backend verification result:',
              result
            )

            if (!verifyResponse.ok) {
              throw new Error(
                result.message ||
                'Payment verification failed'
              )
            }

            // 6. Everything successful
            alert(
              '🎉 Payment Successful!\n\n' +
              'Your order has been confirmed.'
            )

            navigate('/order-success')

          } catch (error) {
            console.error(
              '❌ Verification error:',
              error
            )

            alert(
              'Payment was successful, but confirmation failed.\n\n' +
              error.message
            )
          }
        },
      }

      // 7. Open Razorpay
      const razorpay = new window.Razorpay(options)

      razorpay.on('payment.failed', function (response) {
        console.error(
          '❌ Razorpay payment failed:',
          response.error
        )

        alert(
          'Payment failed: ' +
          response.error.description
        )
      })

      razorpay.open()

    } catch (error) {
      console.error(
        '❌ Payment initialization error:',
        error
      )

      alert(
        'Unable to start payment: ' +
        error.message
      )
    }
  }

  return (
    <main className="checkout-page">

      <Link className="checkout-back" to="/">
        ← Back to Hara Bhara
      </Link>

      <section className="checkout-container">

        <div className="checkout-main">

          <span className="section-eyebrow">
            Almost there
          </span>

          <h1>Checkout</h1>

          <p className="checkout-intro">
            Review your order before moving to payment.
          </p>

          <div className="checkout-items">

            {cartItems.length === 0 ? (
              <p>Your bag is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>
                    <h3>{item.name}</h3>

                    <p>
                      ₹{item.price} · Qty {item.quantity}
                    </p>
                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                </div>
              ))
            )}

          </div>

        </div>

        <aside className="checkout-summary">

          <h2>Your order</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{cartTotal}</strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <strong>₹{delivery}</strong>
          </div>

          <div className="summary-row">
            <span>Taxes</span>
            <strong>₹{taxes}</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>

          <button
            className="payment-button"
            disabled={!cartItems.length}
            onClick={handlePayment}
          >
            Continue to payment →
          </button>

        </aside>

      </section>

    </main>
  )
}
