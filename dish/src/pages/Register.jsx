import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

export default function Register() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)

    const name = formData.get('name').trim()
    const email = formData.get('email').trim().toLowerCase()
    const phone = formData.get('phone').trim()
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    // Check password match
    if (password !== confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    // Check if an account already exists
    const existingUser = localStorage.getItem('haraBharaUser')

    if (existingUser) {
      const user = JSON.parse(existingUser)

      if (user.email === email) {
        alert('An account with this email already exists.')
        navigate('/login')
        return
      }
    }

    // Save registered user
    const user = {
      name,
      email,
      phone,
      password
    }

    localStorage.setItem('haraBharaUser', JSON.stringify(user))

    alert('Account created successfully! Please login.')

    navigate('/login')
  }

  return (
    <main className="register-page">

      <Link className="register-back" to="/login">
        ← Back to Login
      </Link>

      <section className="register-shell">

        <div
          className="register-image"
          role="img"
          aria-label="Fresh vegetarian food"
        >
          <span>
            Fresh food.<br />
            Fresh beginnings.
          </span>
        </div>

        <div className="register-form-wrap">

          <Link className="register-wordmark" to="/">
            Hara Bhara
          </Link>

          <span className="section-eyebrow">
            Join the table
          </span>

          <h1>Let's get started.</h1>

          <p>
            Create your account and keep your favourite
            dishes and orders in one place.
          </p>

          <form onSubmit={handleSubmit}>

            <label htmlFor="name">
              Full name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
              required
            />

            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <label htmlFor="phone">
              Phone number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              autoComplete="tel"
              required
            />

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />

            <label htmlFor="confirmPassword">
              Confirm password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              autoComplete="new-password"
              required
            />

            <button type="submit">
              Create account <span aria-hidden="true">→</span>
            </button>

          </form>

          <div className="register-note">
            Already have an account?{' '}
            <Link to="/login">
              Log in
            </Link>
          </div>

        </div>

      </section>

    </main>
  )
}
