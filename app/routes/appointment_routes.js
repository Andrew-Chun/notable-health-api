const express = require('express')
const router = express.Router()

// require physician model
const Physician = require('./../models/physician')
const handle404 = require('./../lib/customErrors')

// CREATE
// POST /appointments/
router.post('/appointments', (req, res, next) => {
  // get the appointment data from the body of the request
  const appointmentData = req.body.appointment
  // get the physician id from the body
  const physicianId = appointmentData.physicianId
  // find the physician by its id
  Physician.findById(physicianId)
    .then(handle404)
    .then(physician => {
      // add appointment to physician
      physician.appointments.push(appointmentData)
      // save physician
      return physician.save()
    })
    // send responsne back to client
    .then(physician => res.status(201).json({physician: physician}))
    .catch(next)
})

// DESTROY
// DELETE /appointments/:id
router.delete('/appointments/:id', (req, res, next) => {
  const id = req.params.id
  Physician.findOne({ 'appointments._id': id })
    .then(handle404)
    .then(physician => {
      physician.appointments.id(id).remove()
      return physician.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// UPDATE
// PATCH /appointments/:id
router.patch('/appointments/:id', (req, res, next) => {
  const id = req.params.id
  const appointmentData = req.body.appointment

  Physician.findOne({
    'appointments._id': id
  })
    .then(handle404)
    .then(physician => {
      const appointment = physician.appointments.id(id)
      appointment.set(appointmentData)
      return physician.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
