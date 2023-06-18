import mongoose, { connect } from "mongoose";
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("mongodb is already connected");
    return;
  }
  try {
    await connect(process.env.MONGODB_URI, {
      dbName: "doctroappointment",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("mongodb is now connected");
  } catch (error) {
    console.log(error);
  }
};
