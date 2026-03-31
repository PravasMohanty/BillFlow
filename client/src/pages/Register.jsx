import './Login.css';

import { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  })
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
      const res = await API.post('/auth/register', formData)
      if (res.data.success) {
        login(res.data.user, res.data.token)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-box'>
        <h1>💸 BillFlow</h1>
        <h2>Create Account</h2>
        <p className='auth-subtitle'>Start tracking your expenses</p>

        {error && <p className='auth-error'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Full Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='John Doe'
              required
            />
          </div>

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
            <label>Username</label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='johndoe'
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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className='auth-switch'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default Register