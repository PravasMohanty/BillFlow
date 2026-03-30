const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Food',
        'Transport',
        'Shopping',
        'Entertainment',
        'Bills',
        'Health',
        'Education',
        'Travel',
        'Other',
      ],
      default: 'Other',
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Card', 'UPI', 'NetBanking', 'Other'],
      default: 'Cash',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Expense', expenseSchema)