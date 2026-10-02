import { Link } from 'react-router-dom'
import './OrderSuccess.css'

export default function OrderSuccess() {
  return (
    <main className="order-success">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <span className="success-eyebrow">
          Hara Bhara
        </span>

        <h1>
          Order Confirmed!
        </h1>

        <p>
          Thank you for your order. Your payment was
          successful and your food is being prepared.
        </p>

        <p className="success-note">
          A confirmation email has been sent to your
          registered email address.
        </p>

        <Link
          to="/"
          className="home-button"
        >
          Back to Home →
        </Link>

      </div>

    </main>
  )
}
