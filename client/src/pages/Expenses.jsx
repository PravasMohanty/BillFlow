import './Expenses.css';

import {
  useEffect,
  useState,
} from 'react';

import API from '../api/axios';
import ExpenseCard from '../components/ExpenseCard';
import ExpenseForm from '../components/ExpenseForm';

const Expenses = () => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await API.get('/expenses')
        setExpenses(res.data.expenses)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchExpenses()
  }, [])

  const handleExpenseAdded = (newExpense) => {
    setExpenses(prev => [newExpense, ...prev])
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setExpenses(prev => prev.filter(e => e._id !== id))
  }

  if (loading) return <div className='loading'>Loading...</div>

  return (
    <div className='expenses-page'>
      <div className='expenses-header'>
        <h1>My Expenses</h1>
        <button className='add-btn' onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Expense'}
        </button>
      </div>

      {showForm && (
        <div className='form-wrapper'>
          <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        </div>
      )}

      <div className='expenses-list'>
        {expenses.length === 0 ? (
          <p className='no-expenses'>No expenses found. Add your first one!</p>
        ) : (
          expenses.map(expense => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Expenses