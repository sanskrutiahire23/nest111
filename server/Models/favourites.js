const mongoose=require('mongoose')

const Userschema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    filepath:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    uploaddate:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('favourites',Userschema)