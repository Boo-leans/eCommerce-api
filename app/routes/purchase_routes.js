const express = require('express')

const passport = require('passport')

const Purchase = require('./../models/purchase.js')

const { handle404, requireOwnership } = require('../../lib/custom_errors')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Index Route for the product purchase history
router.get('/purchases', requireToken, (req, res, next) => {
  Purchase.find()
    .then(handle404)
    .then(purchase => requireOwnership(req, purchase))
    .then(purchase => res.status(201).json(purchase))
    .catch(next)
})

// Create Route for the product purchse
router.post('/purchases', requireToken, (req, res, next) => {
  req.body.purchase.owner = req.user.id

  Purchase.create(req.body.purchase)
    .then(handle404)
    .then(purchase => res.status(200).json({ purchase }))
    .catch(next)
})

module.exports = router
