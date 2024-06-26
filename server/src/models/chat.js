import mongoose, { Schema, Types } from "mongoose";

const chatSchema = new Schema({
  name: { type: String, required: true, unique: true },
  groupChat: { type: Boolean, default:false },
  creator : {
    type :Types.ObjectId ,
    ref : "User",
  },
 members : [{
    type : Types.ObjectId,
    ref : "User",

 }],
},{
    timestamps : true
});
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;