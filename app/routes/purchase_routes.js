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
    .then(purchase => res.json(purchase))
    .then(() => res.sendStatus(200))
    .catch(next)
})
