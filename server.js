const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const session = require('express-session')
const isSignedIn = require('./middleware/is-signed-in')
const passUsertoView = require('./middleware/pass-user-to-view')

const app = express()


const mongoose = require('mongoose')
const methodOverride = require('method-override')
app.use(express.urlencoded({ extended: false }))

//port config
const PORT = process.env.PORT ? process.env.PORT : '3000'
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(
  session({
    secret: process.env.SESSIONS_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUsertoView)
app.use(methodOverride('_method'))


const authCtrl = require('./controllers/auth')
const postsCtrl = require('./controllers/posts')
const commentCtrl = require("./controllers/comments")

app.use("/auth", authCtrl)
app.use("/posts", postsCtrl)
app.use("/comment", commentCtrl)


app.get("/", async (req, res) => {
  res.render('index.ejs');
});

app.listen(PORT, ()=>{
  console.log('travel buddies is working')
})