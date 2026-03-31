import './ExpenseCard.css';

import API from '../api/axios';

const CATEGORY_ICONS = {
  Food: '🍔',
  Transport: '🚗',
  Shopping: '🛍️',
  Entertainment: '🎬',
  Bills: '📄',
  Health: '💊',
  Education: '📚',
  Travel: '✈️',
  Other: '💸',
}

const ExpenseCard = ({ expense, onDelete, onEdit }) => {
  const handleDelete = async () => {
    try {
      await API.delete(`/expenses/${expense._id}`)
      onDelete && onDelete(expense._id)
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  return (
    <div className='expense-card'>
      <div className='card-left'>
        <span className='category-icon'>
          {CATEGORY_ICONS[expense.category] || '💸'}
        </span>
        <div className='card-info'>
          <h4>{expense.title}</h4>
          <span className='card-meta'>
            {expense.category} • {expense.paymentMethod}
          </span>
          <span className='card-date'>
            {new Date(expense.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

      <div className='card-right'>
        <span className='card-amount'>₹{expense.amount.toLocaleString()}</span>
        <div className='card-actions'>
          <button className='edit-btn' onClick={() => onEdit && onEdit(expense)}>✏️</button>
          <button className='delete-btn' onClick={handleDelete}>🗑️</button>
        </div>
      </div>
    </div>
  )
}

export default ExpenseCard