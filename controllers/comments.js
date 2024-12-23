const router = require('express').Router()

const Comment = require('../models/comment')

router.get('/', async (req, res) => {
  const comments = await Comment.find().populate('owner')
  res.render('comments/index.ejs', { comments })
})

router.get('/new', async (req, res) => {
  res.render('comments/new.ejs')
})

router.post('/:postId/comments', async (req, res) => {
  req.body.owner = req.session.user._id
  await Comment.create(req.body)
  res.redirect(`/posts/${req.params.postId}`)
})

router.get('/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      'owner'
    )
    res.render('/posts', { comments })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

router.post('/:postId/comments', async (req, res) => {
  try {
    req.body.owner = req.session.user._id
    console.log('req.body.postId', req.body.postId)
    await Comment.create(req.body)
    res.redirect(`/posts/${req.params.postId}`)
  } catch (error) {
    console.log(error)
    res.redirect(`/posts/${req.params.postId}`)
  }
})

router.delete('/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId)
    if (comment.owner.equals(req.session.user._id)) {
      await comment.deleteOne()
      res.redirect('/posts')
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/:commentId/edit', async (req, res) => {
  try {
    const currentComment = await Comment.findById(req.params.commentId)
    res.render('comments/edit.ejs', {
      comment: currentComment
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:commentId', async (req, res) => {
  try {
    const currentComment = await Comment.findById(req.params.commentId)
    if (currentComment.owner.equals(req.session.user._id)) {
      await currentComment.updateOne(req.body)
      res.redirect('/posts')
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.log(error)
    res.redirect('/posts')
  }
})

module.exports = router
