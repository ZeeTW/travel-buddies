const express = require('express')
const router = express.Router()

//Import Model
const Post = require('../models/post')

//Routes/ API's / Core Functionality


//landing post page
router.get('/', async(req,res)=>{
  const posts = await Post.find()
  res.render('posts/index.ejs', {posts})
})

router.get('/new', async(req,res)=>{
  res.render('posts/new.ejs')
})

module.exports = router