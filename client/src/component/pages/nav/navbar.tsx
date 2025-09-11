import { Link } from 'react-router-dom';
import icon from '../../../assets/c.png';
import prson from '../../../assets/pr.png';
import './nav.css';
import { cartcontext } from '../../context/contextProvider';
import { useContext } from 'react';

function Navbar() {
  const cartContextValue = useContext(cartcontext);
  const cart = cartContextValue?.cart || [];
  // const token = localStorage.getItem("token");
    const token = sessionStorage.getItem("token");
  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/">MARKET</Link>
      </div>
      <div className="list">
        <ul>
          <li><Link to="/service">Service</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/Category">Category</Link></li>

        </ul>
      </div>
      <div className="cart-section">
        <Link to="/cart">
          <img src={icon} alt="cart" width={25} height={25} />
        <p className='cart-len'>{cart.length}</p>
        </Link>
      </div>
      <ul className="nav-icon">
        {/* <li className="moon">
          <img src={moon} alt="theme" width={15} height={15} />
        </li> */} 
           {token ? (
              <p>Hello, {localStorage.getItem('username') || 'User'}</p>
            ) : (
              <Link to="/signup">signup</Link>
            )}
        <li>
          {token ? (
            <Link to="/profile">
              <img src={prson} alt="profile" width={25} height={25} />
            </Link>
          ) : (
            <Link to="/signup">
              <img src={prson} alt="signup" width={14} height={14} />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;