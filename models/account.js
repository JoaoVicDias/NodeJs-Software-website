const mongoose = require('mongoose')
const schema = mongoose.Schema
 
const account = schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
     type: String,
     require:true
    },
    email:{
        type: String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})





mongoose.model("account",account)
