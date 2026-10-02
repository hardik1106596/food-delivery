import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ cartCount = 0, onCartClick }) {

  const loggedInUser = JSON.parse(
    localStorage.getItem('haraBharaLoggedIn')
  )

  return (
    <header className="navbar">

      <Link className="navbar-brand" to="/" aria-label="Hara Bhara home">
        <span className="navbar-mark" aria-hidden="true">
          hb
        </span>

        <span className="navbar-wordmark">
          <strong>Hara Bhara</strong>
          <small>PLANTS ON THE PLATE</small>
        </span>
      </Link>

      <nav className="navbar-links" aria-label="Main navigation">
        <a href="#menu">Menu</a>
        <a href="#story">Our kitchen</a>
        <a href="#footer">Find us</a>
      </nav>

      <div className="navbar-actions">

        {loggedInUser ? (
          <span className="navbar-user">
            {loggedInUser.name}
          </span>
        ) : (
          <Link className="navbar-login" to="/login">
            Log in
          </Link>
        )}

        <button
          className="navbar-cart"
          type="button"
          onClick={onCartClick}
          aria-label={`Open cart, ${cartCount} items`}
        >
          <span aria-hidden="true">Bag</span>
          <span className="navbar-cart-count">
            {cartCount}
          </span>
        </button>

      </div>

    </header>
  )
}
