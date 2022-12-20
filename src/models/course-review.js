const mongoose=require("mongoose")
const Schema=mongoose.Schema

const reviewSchema=new Schema({
    course:{
        type:Schema.Types.ObjectId,
        ref:"course"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    rating:{
        type:String
    },
    description:{
        type:String
    }
},
{
    timestamps:true
})

const Review=mongoose.model("review",reviewSchema)
module.exports=Review