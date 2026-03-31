import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Login from './pages/Login';
import Register from './pages/Register';
import Stats from './pages/Stats';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to='/login' replace />
}

const AppRoutes = () => {
  const { user } = useAuth()

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path='/login' element={user ? <Navigate to='/dashboard' replace /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to='/dashboard' replace /> : <Register />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/expenses' element={<PrivateRoute><Expenses /></PrivateRoute>} />
        <Route path='/stats' element={<PrivateRoute><Stats /></PrivateRoute>} />
        <Route path='/' element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
        <Route path='*' element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </>
  )
}

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App