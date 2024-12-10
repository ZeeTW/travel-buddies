const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const session = require('express-session')
const isSignedIn = require('./middleware/is-signed-in')
const passUsertoView = require('./middleware/pass-user-to-view')
const multer = require('multer')
const path = require('path')
const app = express()

const mongoose = require('mongoose')
const methodOverride = require('method-override')
app.use(express.urlencoded({ extended: false }))

//port config
const PORT = process.env.PORT ? process.env.PORT : '3000'
mongoose.connect(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

app.use(
  session({
    secret: process.env.SESSIONS_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(express.static(path.join(__dirname, 'public')))
app.use(passUsertoView)
app.use(methodOverride('_method'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    )
  }
})

const upload = multer({ storage })

module.exports = upload

app.post('/create-post', upload.single('image'), async (req, res) => {
  const { title, content } = req.body
  const image = req.file ? `/uploads/${req.file.filename}` : null

  res.redirect('/posts')
})

const authCtrl = require('./controllers/auth')
const postsCtrl = require('./controllers/posts')
const profileCtrl = require('./controllers/profile')
const commentCtrl = require('./controllers/comments')

app.use('/auth', authCtrl)
app.use('/posts', postsCtrl)
app.use('/', profileCtrl)
app.use('/comment', commentCtrl)

app.get('/', async (req, res) => {
  res.render('index.ejs')
})

app.set('view engine', 'ejs')
app.set('views')

app.listen(PORT, () => {
  console.log('travel buddies is working')
})
