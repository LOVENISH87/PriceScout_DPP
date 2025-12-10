// import mongoose from 'mongoose';
// import dotenv from 'dotenv'
// dotenv.config()

// const connectDB = async () =>{
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log(" mongo connected")
// }

// export default connectDB;

import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/test1", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;


// //just the starting