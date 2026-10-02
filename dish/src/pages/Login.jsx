import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const email = formData.get('email').trim().toLowerCase()
    const password = formData.get('password')

    // Get registered account
    const savedUser = localStorage.getItem('haraBharaUser')

    if (!savedUser) {
      alert('No account found. Please register first.')
      navigate('/register')
      return
    }

    const user = JSON.parse(savedUser)

    // Check login credentials
    if (user.email !== email || user.password !== password) {
      alert('Invalid email or password.')
      return
    }

    // Save login session
    localStorage.setItem(
      'haraBharaLoggedIn',
      JSON.stringify({
        name: user.name,
        email: user.email,
      })
    )

    alert(`Welcome back, ${user.name}!`)

    navigate('/')
  }

  return (
    <main className="login-page">

      <Link className="login-back" to="/">
        ← Back to Home
      </Link>

      <section className="login-shell">

        <div
          className="login-image"
          role="img"
          aria-label="Fresh vegetarian food"
        >
          <span>
            Good food.<br />
            Good mood.
          </span>
        </div>

        <div className="login-form-wrap">

          <Link className="login-wordmark" to="/">
            Hara Bhara
          </Link>

          <span className="section-eyebrow">
            Welcome back
          </span>

          <h1>Good to see you.</h1>

          <p>
            Log in to keep your favourite dishes
            and orders in one place.
          </p>

          <form onSubmit={handleSubmit}>

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

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
              required
            />

            <button type="submit">
              Log in <span aria-hidden="true">→</span>
            </button>

          </form>

          <div className="login-note">
            Don't have an account?{' '}
            <Link to="/register">
              Create one
            </Link>
          </div>

        </div>

      </section>

    </main>
  )
}
