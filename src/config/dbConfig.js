import mongoose from "mongoose";
import { DEV_DB_URL } from "./serverConfig.js";

const connectDB = async function (req, res, next) {
  try {
    await mongoose.connect(DEV_DB_URL);
    console.log("DB Connected");
  } catch (error) {
    next(error);
  }
};

export default connectDB;
