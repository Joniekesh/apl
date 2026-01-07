import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URI = String(process.env.MONGO_URI);
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected!");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};

export default connectDB;
