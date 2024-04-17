import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required : true, unique : true },
    bio: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
