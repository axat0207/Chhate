import mongoose, { Schema, Types } from "mongoose";

const requestSchema = new Schema(
  {
    status : {
        type : String,
        default : "Pending",
        enum : ["Pending", "accepted", "rejected"]
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
    },
    receiver: {
        type: Types.ObjectId,
        ref: "User",
      },
  },
  {
    timestamps: true,
  }
);
const Request = mongoose.model("Request", requestSchema);
export default Request;

