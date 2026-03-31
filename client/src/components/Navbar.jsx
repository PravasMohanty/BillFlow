import './Navbar.css';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
        <Link to='/dashboard'>💸 BillFlow</Link>
      </div>

      {user && (
        <div className='navbar-links'>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/expenses'>Expenses</Link>
          <Link to='/stats'>Stats</Link>
          <span className='navbar-username'>Hi, {user.name}</span>
          <button onClick={handleLogout} className='navbar-logout'>Logout</button>
        </div>
      )}
    </nav>
  )
}

export default Navbar