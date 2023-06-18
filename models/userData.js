import { Schema, model, models } from "mongoose";
const userDataSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    // the below code will create one to many relation i.e one user can create many prompts
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  email: {
    type: String,
    required: [true, "The email is required"],
  },
  number: {
    type: Number,
    required: [true, "The phone number is required"],
  },
  date: {
    type: Date,
    required: [true, "The date is required"],
  },
  time: {
    type: String,
    required: [true, "The time is required"],
  },
});

const UserData = models.UserData || model("UserData", userDataSchema);
export default UserData;
