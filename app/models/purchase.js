const mongoose = require('mongoose')
// Model of how data will be stored once an item is purchased.
const purchaseSchema = new mongoose.Schema({
  // update item to items plural
  item: {
    type: Array,
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

module.exports = mongoose.model('Purchase', purchaseSchema)
