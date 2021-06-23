const mongoose = require('mongoose')

const shoppingCartSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema)
