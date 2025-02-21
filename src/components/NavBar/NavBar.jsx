import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './NavBar.css'

export default function Navbar () {
  const total = useSelector((state) => state.cart.totalPrice);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        K3's Pizza 🍕
      </Link>
      
      <Link to="/cart">
        <button className="cart-total">🛒 $ {total.toFixed(2)}</button>
      </Link>
    </nav>
  );
};

