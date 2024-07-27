import mongoose from "mongoose";

const connectMongo=async()=>{
    try{
     await mongoose.connect(process.env.MONGO_DB_URI);
     console.log("connection Mongo db success");
    } catch(error){
        console.log("Error connecting to MongoDB",error.message);
    }
};

export default connectMongo;