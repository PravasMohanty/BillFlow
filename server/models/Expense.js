const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    billingCycle: {
      type: String,
      enum: ['monthly', 'yearly', 'weekly'],
      default: 'monthly',
    },
    category: {
      type: String,
      enum: [
        'Entertainment',
        'Music',
        'Gaming',
        'Productivity',
        'Health',
        'Education',
        'Cloud',
        'Other',
      ],
      default: 'Other',
    },
    renewalDate: {
      type: Date,
      required: [true, 'Renewal date is required'],
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'paused'],
      default: 'active',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Subscription', subscriptionSchema)