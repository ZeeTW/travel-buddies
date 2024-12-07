const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const session = require('express-session')
const passUsertoView = require('./middleware/pass-user-to-view')
const app = express()

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')

//controllers
const postsCtrl = require ('./controllers/post')

app.use('/posts', postsCtrl)

//port config
const PORT = process.env.PORT ? process.env.PORT : '3000'