const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const isSignedIn = require('../middleware/is-signed-in')
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
router.get('/:profile', isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    res.render('auth/profile', { user})
  } catch (error) {
    console.log(error)
    res.status(500).send('Error No user data!')
  }
})

router.get('/:edit.profile', isSignedIn, async (req, res) => {
  try{
    const user = await User.findByIdAndUpdate(req.session.user._id)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error No user data! ')
  }
})

router.post('/:edit-profile', isSignedIn, async (req, res) => {
  try {
    const { username, password, age, nationality, gender, married } = req.body
    const user = await User.findById(req.session.user._id)

    
    user.username = username || user.username

    user.password = password ? bcrypt.hashSync(password, 10) : user.password

    user.age = age || user.age

    user.nationality = nationality || user.nationality

    user.gender = gender || user.gender

    user.married = married || user.married

    await user.save()
    res.redirect('/auth/profile')

  } catch (error) {
    console.log(error)
    res.status(500).send('Error updating profile')
  }
})

router.post('/:delete-profile', isSignedIn, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.session.user._id)
    req.session.destroy((err) => {
      if (err) return res.status(500).send('Error loggong out')
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error Deleting profile')
  }
})


module.exports = router
