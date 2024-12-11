const express = require('express')
const router = express.Router()
const User = require('../models/user')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/profile/show', async (req, res) => {
  const user = await User.findById(req.session.user._id)
  res.render('profile/show.ejs', { user })
})

router.get('/controllers/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/sign-in')
  }

  const user = User.findById(req.session.user._id)

  res.render('profile/show.ejs', { user })
})

// Show Profile
router.get('/profile', isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    res.render('profile/show', { user }) // Render profile/show.ejs
  } catch (error) {
    console.log(error)
  }
})

// Edit Profile
router.get('/profile/edit', isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    res.render('profile/edit', { user }) // Render edit profile form
  } catch (error) {
    console.log(error)
  }
})

// Update Profile
router.post('/profile/:id/edit', isSignedIn, async (req, res) => {
  try {
    const { username, age, nationality, gender } = req.body

    const user = await User.findByIdAndUpdate(req.session.user._id, req.body)

    user.username = username || user.username
    user.age = age || user.age
    user.nationality = nationality || user.nationality
    user.gender = gender || user.gender

    await user.save()
    res.redirect('/profile/show')
  } catch (error) {
    console.log(error)
  }
})

// Delete Profile
router.post('/profile/delete', isSignedIn, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.session.user._id)
    req.session.destroy((err) => {
      if (err) return res.status(500).send('Error logging out')
    })
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
