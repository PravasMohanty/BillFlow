import './ExpenseForm.css';

import { useState } from 'react';

import API from '../api/axios';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Education', 'Travel', 'Other']
const PAYMENT_METHODS = ['Cash', 'Card', 'UPI', 'NetBanking', 'Other']

const ExpenseForm = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Other',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Cash',
    notes: '',
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
      const dataToSend = {
        ...formData,
        amount: parseFloat(formData.amount)
      }
      const res = await API.post('/expenses', dataToSend)
      if (res.data.success) {
        setFormData({
          title: '',
          amount: '',
          category: 'Other',
          date: new Date().toISOString().split('T')[0],
          paymentMethod: 'Cash',
          notes: '',
        })
        onExpenseAdded && onExpenseAdded(res.data.expense)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='expense-form' onSubmit={handleSubmit}>
      <h2>Add Expense</h2>

      {error && <p className='form-error'>{error}</p>}

      <div className='form-group'>
        <label>Title</label>
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='e.g. Groceries'
          required
        />
      </div>

      <div className='form-group'>
        <label>Amount</label>
        <input
          type='number'
          name='amount'
          value={formData.amount}
          onChange={handleChange}
          placeholder='0.00'
          min='0'
          required
        />
      </div>

      <div className='form-row'>
        <div className='form-group'>
          <label>Category</label>
          <select name='category' value={formData.category} onChange={handleChange}>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label>Payment Method</label>
          <select name='paymentMethod' value={formData.paymentMethod} onChange={handleChange}>
            {PAYMENT_METHODS.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='form-group'>
        <label>Date</label>
        <input
          type='date'
          name='date'
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label>Notes (optional)</label>
        <textarea
          name='notes'
          value={formData.notes}
          onChange={handleChange}
          placeholder='Any additional details...'
          rows={3}
        />
      </div>

      <button type='submit' className='submit-btn' disabled={loading}>
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  )
}

export default ExpenseForm