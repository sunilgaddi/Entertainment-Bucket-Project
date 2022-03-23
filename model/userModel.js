const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:[true,"Please enter your First Name"],
        trim:true
    },
    lastName:{
        type:String,
        require:[true,"Please enter your First Name"],
        trim:true
    },
    email:{
        type:String,
        require:[true,"Please enter your Email"],
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        require:[true,"Please enter your Password"],
        trim:true,
    },
    role:{
        type:Number,
        default:0,  //0 - users, 1 - admins
    },
    phoneNumber:{
        type:Number,
        require:[true,"Please enter your Password"],
        trim:true,
    }
},{
    timestamps:true
}
)
module.exports = mongoose.model("Users", UserSchema)