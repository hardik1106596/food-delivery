import React,{useState} from 'react'
import './Navbar.css'
import { assets } from '../../assets/admin_assets/assets'


const Navbar = () => {

  const[menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      {/* Left */}
      <img src={assets.logo} alt="Logo" />

      {/* Center */}
      <ul className="menu">
        <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</li>
        <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</li>
        <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</li>
        <li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</li>
      </ul>

      {/* Right */}
      <div className="right">
        <span className="search-icon">🔍</span>
        <div className="dot">
          <span className="cart-icon">🛒</span>
          <div className="red-dot"> </div>
        </div>
        <button className="signin">sign in</button>
      </div>
    </div>
  );
};


export default Navbar
