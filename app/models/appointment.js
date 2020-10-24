const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  kind: {
    type: String,
    required: true
  },
  physician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Physician'
  }
}, {
  timestamps: true
})

module.exports = appointmentSchema
