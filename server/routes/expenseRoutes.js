const express = require('express')
const router = express.Router()
const {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getStats,
} = require('../controllers/expenseController')
const protect = require('../middleware/auth')

router.use(protect) // all routes below are protected

router.get('/stats', getStats)
router.get('/', getAllExpenses)
router.post('/', addExpense)
router.put('/:id', updateExpense)
router.delete('/:id', deleteExpense)

module.exports = router