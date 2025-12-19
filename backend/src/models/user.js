import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,

    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        require : true
    }, 
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    }
},
 
{timestamps : true}

);


export default mongoose.model("user" , userSchema);