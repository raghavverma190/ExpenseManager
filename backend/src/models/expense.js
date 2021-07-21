const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ['rupee', 'dollar', 'pound', 'euro'], //only these currencies allowed to be stored, otherwise error thrown
      default: 'rupee',
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ['Home', 'Food', 'Fuel', 'Shopping', 'Other'], //only these categories allowed to be stored, otherwise error thrown
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
