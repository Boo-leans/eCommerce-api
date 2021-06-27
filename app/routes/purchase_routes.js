const express = require('express')

const passport = require('passport')

const Purchase = require('./../models/purchase.js')

const { handle404, requireOwnership } = require('../../lib/custom_errors')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Index Route for the product purchase history
router.get('/purchases', requireToken, (req, res, next) => {
  // Using the query find as a method on the Purchase model.
  Purchase.find()
  // this promise will return an error if the id of the owner is not found in the
  // database.
    .then(handle404)
    // this maps over the array of purchase items to spit each item when a get
    // request is called.
    .then(purchase => {
      return purchase.map(item => item)
    })
    // this sends a 201 status if successful and turns the item to json to be
    // transfered to the front end at ease.
    .then(purchase => res.status(201).json(purchase))
    .catch(next)
})

// Create Route for the product purchse
// We will need to use the purchases url, and require a token.
router.post('/purchases', requireToken, (req, res, next) => {
  // We will use the create method to add to the body a purchase object with the
  // data inside.
  Purchase.create(req.body.purchase)
  // We will only allow this if the creater has a valid id.
    .then(handle404)
    // We will return the created data in json format.
    .then(purchase => res.status(200).json({ purchase }))
    .catch(next)
})

// This will be delete route using the purchase url and an id for the item
// we want to remove.
router.delete('/purchases/:id', requireToken, (req, res, next) => {
  // We will use the findById query to make sure the data bieng removed matches
  // the id we want.
  Purchase.findById(req.params.id)
    .then(handle404)
    // We will then requireOwnership which will check if a token is being used.
    // Then delete the purchase data if so.
    .then(purchase => {
      requireOwnership(req, purchase)
      purchase.deleteOne()
    })
    // send status 204 for delete success.
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Update Route for the product purchase
// We need an id and a token.
router.patch('/purchases/:id', requireToken, (req, res, next) => {
  // We will start by deleting the owner of the purchase
  delete req.body.purchase.owner
  // We will get the id from the url and store it in a variable
  const id = req.params.id
  // we will also store the purchase data in a variable
  const purchaseData = req.body.purchase
  // Use the findById query on the purchase model.
  Purchase.findById(id)
  // Check if owner has a valid id.
    .then(handle404)
    // CHeck for a token and if so update the purchase data and return it.
    .then(purchase => {
      requireOwnership(req, purchase)
      return purchase.updateOne(purchaseData)
    })
    // give a status 200 for success.
    .then(() => { res.sendStatus(200) })
    .catch(next)
})

module.exports = router
