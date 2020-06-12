const mongoose = require('mongoose')
const schema = mongoose.Schema
 
const account = schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
<<<<<<< HEAD
        type:String,
        require:true
=======
     type: String,
     require:true
>>>>>>> f0cfafb39ee2fd1d1705cdb5e020bf0ebe088717
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
