const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isSignedIn = require('../middleware/is-signed-in');
const app = express()

app.get('../profile/show.ejs', (req, res) => {
  const user =  User.findById(req.session.user._id);
    res.render('profile/show')
})

app.get("/controllers/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/sign-in');
  }

  res.render("profile/show.ejs", { user: req.session.user });
});

// Show Profile
router.get('/profile', isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('profile/show', { user }); // Render profile/show.ejs
  } catch (error) {
    console.log(error);
    res.status(500).send('Error loading profile');
  }
});

// Edit Profile
router.get('/profile/edit', isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('profile/edit', { user }); // Render edit profile form
  } catch (error) {
    console.log(error);
  }
});

// Update Profile
router.post('/profile/edit', isSignedIn, async (req, res) => {
  try {
    const { username, age, nationality, gender, married } = req.body;
    const user = await User.findById(req.session.user._id);

    user.username = username || user.username;
    user.age = age || user.age;
    user.nationality = nationality || user.nationality;
    user.gender = gender || user.gender;
    user.married = married || user.married;

    await user.save();
    res.redirect('/controllers/profile'); // Redirect to profile page
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating profile');
  }
});

// Delete Profile
router.post('/profile/delete', isSignedIn, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.session.user._id);
    req.session.destroy((err) => {
      if (err) return res.status(500).send('Error logging out');
    });
    res.redirect('/'); // Redirect to homepage after deletion
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting profile');
  }
});

module.exports = router;