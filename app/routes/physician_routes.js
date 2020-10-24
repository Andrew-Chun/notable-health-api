// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for physicians
const Physician = require('../models/physician')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
// const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { physician: { title: '', text: 'foo' } } -> { physician: { text: 'foo' } }
// const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
// const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /physicians
router.get('/physicians', (req, res, next) => {
  Physician.find()
    .then(physicians => {
      // `physicians` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return physicians.map(physician => physician.toObject())
    })
    // respond with status 200 and JSON of the physicians
    .then(physicians => res.status(200).json({ physicians: physicians }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /physicians/5a7db6c74d55bc51bdf39793
router.get('/physicians/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Physician.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "physician" JSON
    .then(physician => res.status(200).json({ physician: physician.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /physicians
router.post('/physicians', (req, res, next) => {
  // set owner of new physician to be current user
  // req.body.physician.owner = req.user.id

  Physician.create(req.body.physician)
    // respond to succesful `create` with status 201 and JSON of new "physician"
    .then(physician => {
      res.status(201).json({ physician: physician.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

module.exports = router
