const express = require('express')
const router = express.Router()

//Import Model
const Post = require('../models/post')
const isSignedIn = require('../middleware/is-signed-in')

//Routes/ API's / Core Functionality


//landing post page
router.get('/', async(req,res)=>{
  const posts = await Post.find({}).populate('owner')
  res.render('posts/index.ejs', {posts})
})

//create a new post
router.get('/new', isSignedIn, async(req,res)=>{
  res.render('posts/new.ejs')
})

router.post('/', isSignedIn, async (req,res)=>{
  req.body.owner = req.session.user._id
  await Post.create(req.body)
  res.redirect('/posts')
})

//show functionality
router.get('/:postId', async(req,res)=>{
  const post = await Post.findById(req.params.postId).populate('owner')

  res.render('posts/show.ejs', {post})
})

//delete functionality
router.delete('/:postId', async(req,res)=>{
  const post = await Post.findById(req.params.postId)

  if(post.owner.equals(req.session.user._id)){
    await post.deleteOne()
    res.redirect('/posts')
  } else {
    res.send('you dont have permission')
  }
})

//edit posting
router.get('/:postId/edit', async(req,res)=>{
  const post = await Post.findById(req.params.postId)
  res.render('posts/edit.ejs', {post})
})

module.exports = router