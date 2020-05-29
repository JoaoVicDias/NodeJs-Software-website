const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const path = require('path')
const router = express.Router()
const mongoose = require('mongoose')
require('./models/account')
const account = mongoose.model('account')
const bcrypt = require('bcryptjs')
const passport = require('passport')
require('./config/auth')(passport)



//Setting passport
app.use(passport.initialize())
app.use(passport.session())

//Statics files
app.use(express.static('public'))

//setting  Body-parser
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
//Setting MongoDB
mongoose.connect("mongodb://localhost:27017/robo3t",{useNewUrlParser: true,useUnifiedTopology:true}).then(()=>{
    console.log("MongoDB is running ...")
}).catch((err)=>{
    console.log("Error to connect MongoDB",err)
})

//Creating the Main route
app.use("/",router)





//Creating routes
router.get("/",(req,res) =>{
    res.sendFile(path.join(__dirname+"/public/site.html"))
})


router.get("/Download",(req,res) => {
    res.sendFile(path.join(__dirname+"/public/download.html"))
})


router.get("/Aboutme",(req,res)=> {
    res.sendFile(path.join(__dirname+'/public/aboutme.html'))
})

router.get("/Account",(req,res) => {
    res.sendFile(path.join(__dirname+'/public/account.html'))
})

router.get("/CreatingAccount",(req,res) => {
    res.sendFile(path.join(__dirname+"/public/createAccount.html"))
})

router.post("/CreatingAccount",(req,res)=>{
    
    if(!req.body.name || typeof req.body.name == undefined || req.body.nome == null ){
        
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null ){
        
    }

    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null ){
        
    }

    if(req.body.password.length < 6){
        
    }

    if(req.body.password != req.body.password2){
        
    }else{
        account.findOne({email: req.body.email}).then((Account)=>{
            if (Account){
               
            }else{
                const newAccount = new account({
                    name: req.body.name,
                    email:req.body.email,
                    password:req.body.password
                })

                bcrypt.genSalt(10,(erro,salt)=>{
                    bcrypt.hash(newAccount.password, salt, (erro,hash)=>{
                        newAccount.password = hash
                        newAccount.save().then(()=>{
                            res.redirect("/")
                            console.log('Account created')
                        })
                    })
                })
               
        
            }
        })
    }
    
    
})

router.post("/Account",(req,res,next)=>{
    passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/Account",
    })
    
    
})

router.get("/Logout",(req,res)=>{
    req.logOut()
    res.redirect("/")
})














//Start the server
app.listen(3001,console.log("Server is running ..."))
