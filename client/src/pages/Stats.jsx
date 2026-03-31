import './Stats.css';

import {
  useEffect,
  useState,
} from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import API from '../api/axios';

const COLORS = ['#e94560', '#0f3460', '#533483', '#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4']

const Stats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const res = await API.get(`/expenses/stats?month=${month}&year=${year}`)
        setStats(res.data.stats)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [month, year])

  const categoryData = stats?.byCategory
    ? Object.entries(stats.byCategory).map(([name, value]) => ({ name, value }))
    : []

  const paymentData = stats?.byPaymentMethod
    ? Object.entries(stats.byPaymentMethod).map(([name, value]) => ({ name, value }))
    : []

  if (loading) return <div className='loading'>Loading...</div>

  return (
    <div className='stats-page'>
      <div className='stats-header'>
        <h1>Spending Stats</h1>
        <div className='stats-filters'>
          <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
            {[2023, 2024, 2025, 2026].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='total-banner'>
        <h2>Total Spent: <span>₹{stats?.totalSpent?.toLocaleString() || 0}</span></h2>
        <p>{stats?.expenseCount || 0} expenses this month</p>
      </div>

      <div className='charts-grid'>
        <div className='chart-card'>
          <h3>By Category</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width='100%' height={280}>
              <PieChart>
                <Pie data={categoryData} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={100}>
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className='no-data'>No data for this period</p>
          )}
        </div>

        <div className='chart-card'>
          <h3>By Payment Method</h3>
          {paymentData.length > 0 ? (
            <ResponsiveContainer width='100%' height={280}>
              <BarChart data={paymentData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#2a2a4a' />
                <XAxis dataKey='name' stroke='#a0a0b0' />
                <YAxis stroke='#a0a0b0' />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Bar dataKey='value' fill='#e94560' radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className='no-data'>No data for this period</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Stats