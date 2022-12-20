const mongoose=require("mongoose")
const Schema=mongoose.Schema

const buyitemSchema=new Schema({
    cart:{
        type:Schema.Types.ObjectId,
        ref:"cart"
    },
    course:{
        type:String
    },
    amount:{
        type:String
    }
})

const Shoping=mongoose.model("shoping",buyitemSchema)
module.exports=Shoping