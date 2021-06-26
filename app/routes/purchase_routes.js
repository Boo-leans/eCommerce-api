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
    .then(purchase => {
      return purchase.map(item => item.toObject())
    })
    .then(purchase => res.status(201).json(purchase))
    .catch(next)
})

// Create Route for the product purchse
router.post('/purchases', requireToken, (req, res, next) => {
  Purchase.create(req.body.purchase)
    .then(handle404)
    .then(purchase => res.status(200).json({ purchase }))
    .catch(next)
})

router.delete('/purchases/:id', requireToken, (req, res, next) => {
  Purchase.findById(req.params.id)
    .then(handle404)
    .then(purchase => {
      requireOwnership(req, purchase)
      purchase.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Update Route for the product purchase
router.patch('/purchases/:id', requireToken, (req, res, next) => {
  delete req.body.purchase.owner
  const id = req.params.id
  const purchaseData = req.body.purchase
  Purchase.findById(id)
    .then(handle404)
    .then(purchase => {
      requireOwnership(req, purchase)
      return purchase.updateOne(purchaseData)
    })
    .then(() => { res.sendStatus(204) })
    .catch(next)
})

module.exports = router
