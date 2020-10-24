const mongoose = require('mongoose')

const appointmentSchema = require('./appointment')

const physicianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  appointments: [appointmentSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Physician', physicianSchema)
