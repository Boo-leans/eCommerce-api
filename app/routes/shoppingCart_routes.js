const express = require('express')

const passport = require('passport')

const ShoppingCart = require('./../models/shoppingCart')

const { handle404, requireOwnership } = require('../../lib/custom_errors')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Index Route for shopping cart
router.get('/shopping-cart', requireToken, (req, res, next) => {
  ShoppingCart.find()
    .then(handle404)
    .then(shoppingCart => requireOwnership(req, shoppingCart))
    .then(shoppingCart => res.status(201).json(shoppingCart))
    .catch(next)
})

module.exports = router
