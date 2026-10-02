import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-main">
        <Link className="footer-brand" to="/">Hara Bhara<span>Good food grows good days.</span></Link>
        <p>Seasonal vegetarian cooking, made with heart<br />and served around the neighbourhood.</p>
        <a className="footer-contact" href="mailto:hello@harabhara.example">hello@harabhara.example <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Hara Bhara Kitchen</span>
        <span>100% vegetarian · Always made fresh</span>
      </div>
    </footer>
  )
}
