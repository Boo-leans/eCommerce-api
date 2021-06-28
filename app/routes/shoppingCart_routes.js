const express = require('express')

const passport = require('passport')

const ShoppingCart = require('../models/shoppingCart.js')

const { handle404, requireOwnership } = require('../../lib/custom_errors')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Index Route for the product shoppingCart history
router.get('/shoppingCart', requireToken, (req, res, next) => {
  ShoppingCart.find()
    .then(handle404)
    .then(shoppingCart => {
      return shoppingCart.map(item => item.toObject())
    })
    .then(shoppingCart => res.status(201).json(shoppingCart))
    .catch(next)
})

// Create Route for the product purchse
router.post('/shoppingCart', requireToken, (req, res, next) => {
  req.body.shoppingCart.owner = req.user.id

  ShoppingCart.create(req.body.shoppingCart)
    .then(handle404)
    .then(shoppingCart => res.status(200).json({ shoppingCart }))
    .catch(next)
})

router.delete('/shoppingCart/:id', requireToken, (req, res, next) => {
  ShoppingCart.findById(req.params.id)
    .then(handle404)
    .then(shoppingCart => {
      requireOwnership(req, shoppingCart)
      shoppingCart.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Update Route for the product shoppingCart
router.patch('/shoppingCart/:id', requireToken, (req, res, next) => {
  delete req.body.shoppingCart.owner
  const id = req.params.id
  const shoppingCartData = req.body.shoppingCart
  ShoppingCart.findById(id)
    .then(handle404)
    .then(shoppingCart => {
      requireOwnership(req, shoppingCart)
      return shoppingCart.updateOne(shoppingCartData)
    })
    .then(() => { res.sendStatus(204) })
    .catch(next)
})

module.exports = router
