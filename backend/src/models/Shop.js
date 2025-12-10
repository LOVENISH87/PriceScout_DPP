// import mongoose from 'mongoose'
// //create schema here!!!!
// const shopSchema  =  new mongoose.Schema({
//     name : {
//         type : String,
//         required : true,
//         unique : true,
//         trim  : true
//     },

//     location :  {  
//         type : String,
//         required : true,
//         unique : false, 
//         trim : true
//     },

// products: [
//   {
//     name: { type: String, required: true, trim: true },
//     price: { type: Number, required: true },


//   }
// ]


// }) 
 


//! done!!!!
import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    location: {
        type: String,
        trim: true,
    }
});

export default mongoose.model("Shop", shopSchema);
