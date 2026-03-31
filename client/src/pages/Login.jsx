import './Login.css';

import { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await API.post('/auth/login', formData)
      if (res.data.success) {
        login(res.data.user, res.data.token)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-box'>
        <h1>💸 BillFlow</h1>
        <h2>Welcome Back</h2>
        <p className='auth-subtitle'>Sign in to your account</p>

        {error && <p className='auth-error'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='you@example.com'
              required
            />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='••••••••'
              required
            />
          </div>

          <button type='submit' className='auth-btn' disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className='auth-switch'>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login