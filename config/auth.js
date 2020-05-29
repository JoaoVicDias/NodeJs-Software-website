const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('../models/account')
const account = mongoose.model('account')





module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email'},(email,password, done)=>{
        account.findOne({email:email}).then((user)=>{
            if(!user){
                return done(null, false, {message:'This account does not exists!'})
            }
            bcrypt.compare(password,user.password,(error,match)=>{
                if(match){
                    return done(null,user)
                }else{
                    return done(null,false,{message:'Password incorrect'})
                }
            })
        })
    }))

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })

    passport.deserializeUser((id,done)=>{
        account.findById(id,(error,user)=>{
            done(error,user)
        })
    })


}