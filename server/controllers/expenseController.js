const Expense = require('../models/Expense')

// GET /api/expenses
const getAllExpenses = async (req, res) => {
  try {
    const { category, startDate, endDate, paymentMethod } = req.query

    const filter = { userId: req.user.id }

    if (category) filter.category = category
    if (paymentMethod) filter.paymentMethod = paymentMethod
    if (startDate || endDate) {
      filter.date = {}
      if (startDate) filter.date.$gte = new Date(startDate)
      if (endDate) filter.date.$lte = new Date(endDate)
    }

    const expenses = await Expense.find(filter).sort({ date: -1 })

    return res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

// POST /api/expenses
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, paymentMethod, notes } = req.body

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ error: 'Title, amount, category and date are required' })
    }

    const expense = new Expense({
      userId: req.user.id,
      title,
      amount,
      category,
      date,
      paymentMethod,
      notes,
    })

    await expense.save()

    return res.status(201).json({
      success: true,
      message: 'Expense added',
      expense,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

// PUT /api/expenses/:id
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user.id,
    })

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' })
    }

    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )

    return res.status(200).json({
      success: true,
      message: 'Expense updated',
      expense: updated,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

// DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user.id,
    })

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' })
    }

    await Expense.findByIdAndDelete(req.params.id)

    return res.status(200).json({
      success: true,
      message: 'Expense deleted',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

// GET /api/expenses/stats
const getStats = async (req, res) => {
  try {
    const { month, year } = req.query

    const start = new Date(year || new Date().getFullYear(), (month - 1) || new Date().getMonth(), 1)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0)

    const expenses = await Expense.find({
      userId: req.user.id,
      date: { $gte: start, $lte: end },
    })

    // total spent
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)

    // by category
    const byCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount
      return acc
    }, {})

    // by payment method
    const byPaymentMethod = expenses.reduce((acc, e) => {
      acc[e.paymentMethod] = (acc[e.paymentMethod] || 0) + e.amount
      return acc
    }, {})

    return res.status(200).json({
      success: true,
      stats: {
        totalSpent,
        byCategory,
        byPaymentMethod,
        expenseCount: expenses.length,
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getStats,
}