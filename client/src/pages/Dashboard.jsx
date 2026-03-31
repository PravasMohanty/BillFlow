import './Dashboard.css';

import {
  useEffect,
  useState,
} from 'react';

import API from '../api/axios';
import ExpenseCard from '../components/ExpenseCard';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth()
  const [recentExpenses, setRecentExpenses] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesRes, statsRes] = await Promise.all([
          API.get('/expenses'),
          API.get('/expenses/stats'),
        ])
        setRecentExpenses(expensesRes.data.expenses.slice(0, 5))
        setStats(statsRes.data.stats)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className='loading'>Loading...</div>

  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <h1>Welcome back, {user?.name} 👋</h1>
        <p>Here's your expense summary</p>
      </div>

      <div className='stats-grid'>
        <div className='stat-card'>
          <span className='stat-icon'>💰</span>
          <div>
            <p className='stat-label'>Total This Month</p>
            <h3>₹{stats?.totalSpent?.toLocaleString() || 0}</h3>
          </div>
        </div>

        <div className='stat-card'>
          <span className='stat-icon'>📊</span>
          <div>
            <p className='stat-label'>Total Expenses</p>
            <h3>{stats?.expenseCount || 0}</h3>
          </div>
        </div>

        <div className='stat-card'>
          <span className='stat-icon'>🏆</span>
          <div>
            <p className='stat-label'>Top Category</p>
            <h3>
              {stats?.byCategory
                ? Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
                : 'N/A'}
            </h3>
          </div>
        </div>
      </div>

      <div className='recent-expenses'>
        <h2>Recent Expenses</h2>
        <div>
          {recentExpenses.length === 0 ? (
            <p className='no-expenses'>No expenses yet. Add your first one!</p>
          ) : (
            recentExpenses.map(expense => (
              <ExpenseCard
                key={expense._id}
                expense={expense}
                onDelete={(id) => setRecentExpenses(prev => prev.filter(e => e._id !== id))}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard