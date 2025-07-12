import mongoose from "mongoose";
import { db_name } from "../constant.js";

const connectDB = async function () {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${db_name}`
    );
    console.log(
      "MongoDB connected successfully: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("Error connecting database :: ERROR in db.js :: ", error);
    process.exit(1);
  }
};

export default connectDB;
