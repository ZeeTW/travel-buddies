const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
//routes/API/Controller functions
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs')
})
router.post('/sign-up', async (req, res) => {
  try {
//bcrypt for password encryption
const hashedPassword = bcrypt.hashSync(req.body.password, 10)
req.body.password = hashedPassword
    const user = await User.create(req.body)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs')
})
router.post('/sign-in', async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (!userInDatabase) {
    return res.send('Login failed(your username is invalid). Please try again.')
  }
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )
  if (!validPassword) {
    return res.send('Login failed (your password is invalid). Please try again')
  }
  //User exists and Password is valid
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id
  }
  res.redirect('/')
})
router.get('/sign-out', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})
module.exports = router