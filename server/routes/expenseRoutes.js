const express = require('express')
const expenseRouter = express.Router()
const {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getStats,
} = require('../controllers/expenseController')

const protect = require('../middlewares/auth')

expenseRouter.use(protect)

expenseRouter.get('/stats', getStats)
expenseRouter.get('/', getAllExpenses)
expenseRouter.post('/', addExpense)
expenseRouter.put('/:id', updateExpense)
expenseRouter.delete('/:id', deleteExpense)

module.exports = expenseRouter