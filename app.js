const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const path = require('path')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
require('./models/account')
const account = mongoose.model('account')
const bcrypt = require('bcryptjs')
const passport = require('passport')
require('./config/auth')(passport)
const session = require('express-session')
const flash = require('connect-flash')
const router = require('./routes/mainRouter')

//Setting session
app.use(session({
    secret:"softwarewebsite",
    resave:true,
    saveUninitialized:true
}))

//Setting passport
app.use(passport.initialize())
app.use(passport.session())

//Setting flash
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

//Statics files
app.use(express.static('public'))

//Setting view engine
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//setting  Body-parser
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

//Setting MongoDB
mongoose.connect("mongodb://localhost:27017/robo3t",{useNewUrlParser: true,useUnifiedTopology:true}).then(()=>{
    console.log("MongoDB is running ...")
}).catch((err)=>{
    console.log("Error to connect MongoDB",err)
})

//Calling the route
app.use(router)







//Start the server
app.listen(3001,console.log("Server is running ..."))
