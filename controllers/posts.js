const express = require('express')
const router = express.Router()

//Import Model
const Post = require('../models/post')

//Routes/ API's / Core Functionality


//landing page
router.get('/', async(req,res)=>{
  const posts = await Post.find()
  res.render('posts/index.ejs', {posts})
})


module.exports = router