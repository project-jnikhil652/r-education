const mongoose=require("mongoose")
const Schema=mongoose.Schema

const savedSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    course:{
        type:Schema.Types.ObjectId,
        ref:"course"
    }
},
{
    timestamp:true
})

const Saved=mongoose.model("saved",savedSchema)
module.exports=Saved