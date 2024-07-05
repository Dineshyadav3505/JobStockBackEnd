import mongoose from "mongoose";
 

const connectToDatabase = async(req, res )=>{
  try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
       console.log(`MongoDB Connected !! DB HOST: ${connectionInstance.Connection.host}`);

   } catch (error) {
       console.error("MONGO-DB Connection Error:", error);
       process.exit(1);
   }
};
export {connectToDatabase}
