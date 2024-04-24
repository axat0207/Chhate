import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { emitEvent, sendToken } from "../utils/features.js";
import Chat from "../models/chat.js";
import { isValidObjectId } from "mongoose";
import Request from "../models/request.js";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherId } from "../lib/helper.js";

export async function register(req, res) {
  const { fullName, bio, username, email, password, avatar } = req.body;

  try {
    const userExist = await User.findOne({ $or: [{ username }, { email }] });

    if (userExist) {
      return res.status(409).send("User already exists.");
    }

    // Hash the password before saving it to database
    const hashedPassword = await bcrypt.hash(password, 10);

    const registereduser = await User.create({
      fullName,
      bio,
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    if (!registereduser) {
      return res.status(500).json({ message: "Something Went wrong." });
    }

    if (req.cookies.accessToken) {
      res.clearCookie("accessToken", {
        maxAge: 15 * 1000 * 60 * 60 * 24,
        sameSite: "none",
        httpOnly: true,
        secure: true,
      });
    }
    const userForToken = await User.findOne({ $or: [{ username }, { email }] });
    sendToken(res, userForToken, 201, "User Created Sucessfully");
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function login(req, res) {
  const { username, email, password } = req.body;
  try {
    const UserExist = await User.findOne({ $or: [{ email }, { username }] });
    if (!UserExist) {
      res.status(400).json({
        status: "error",
        message: `Email or username does not exist
              Please sign up`,
      });
    }
    const isValidPassword = await bcrypt.compare(password, UserExist.password);

    if (!isValidPassword) {
      return res.status(400).json({
        status: "error",
        message: `Invalid Password`,
      });
    }

    sendToken(res, UserExist, 200, "Logged In sucessfully");
  } catch (error) {
    res.status(500).json({
      status: "Server error",
      message: `${error.message}`,
    });
  }
}

export async function logout(req, res) {
  try {
    await res.clearCookie("accessToken", {
      maxAge: 15 * 1000 * 60 * 60 * 24,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    res.status(200).send("logged out");
  } catch (error) {
    throw new error.message();
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.user);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
export const findUser = async (req, res) => {
  try {
    const { name = "" } = req.query;
    if (!name.trim()) {
      return res.status(400).json({ message: "Please provide a username" });
    }

    // Assuming req.user is populated correctly with the user ID
    const myChats = await Chat.find({
      groupChat: false,
      members: { $in: [req.user] },
    });

    const allUsersFromMyChat = myChats.flatMap((chat) =>
      chat.members.map((member) => member.toString())
    );

    const allOtherUsers = await User.find({
      _id: { $nin: allUsersFromMyChat },
      // name: { $regex: name, $options: "i" },
    }); // Using lean to get plain JavaScript objects

    const users = allOtherUsers.map(({ _id, fullName, avatar }) => ({
      _id,
      fullName,
      avatar: avatar.url, // Assuming the user document has an avatarUrl field
    }));

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).send(error.message); // It's good to send a 500 status on server error
  }
};

export const sendRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId || !isValidObjectId(userId)) {
      throw new Error("Invalid user id");
    }
    const me = req.user;
    const otherUser = userId;

    const request = await Request.findOne({
      $or: [
        { sender: me, receiver: otherUser },
        { sender: otherUser, receiver: me },
      ],
    });
    console.log(request);
    if (request) {
      return res
        .status(409)
        .json({ success: false, message: "The request is already made." });
    }

    await new Request({ sender: me, receiver: otherUser }).save();

    emitEvent(req, NEW_REQUEST, [userId]);

    res.status(200).json({
      sucess: true,
      message: "Friend request is sent sucessfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const { requestId, accept } = req.body;
    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("receiver", "name");

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "No such request found" });
    }
    if (request.receiver._id.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    if (!accept) {
      //reject the friend request
      await request.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Friend Request rejected.",
      });
    }
    const members = [request.sender._id, request.receiver._id];

    await Promise.all([
      Chat.create({
        members,
        name: `${request.sender.name}-${request.receiver.name}`,
      }),
      await request.deleteOne(),
    ]);

    emitEvent(req, REFETCH_CHATS, members);
    res.status(200).json({
      success: true,
      senderId: request.sender._id,
      message: "Request has been accepted",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getNotifiction = async (req, res) => {
  try {
    const requests = await Request.find({ receiver: req.user }).populate(
      "sender",
      "name avatar"
    );

    const allRequest = requests.map(({ _id, sender }) => ({
      _id,
      sender: {
        _id: sender._id,
        name: sender.fullName,
        avatar: sender.avatar.url,
      },
    }));
    res.status(200).json(allRequest);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const myfriends = async (req, res) => {
  try {
    // Get friend list of user from database
    const chatId = req.query.chatId;
    const chats = await Chat.find({ members: req.user._id, groupChat : false }).populate('members', 'name avatar');

    const friends = chats.map(({members})=>{
      const otherUser = getOtherId(members, req.user._id);
      return{
        _id : otherUser._id,
        fullName : otherUser.fullName,
        avatar : otherUser.avatar.url
      }
    })

    if(chatId){
      const chat = await Chat.findById(chatId);
      const availableFriends = friends.filter((f)=>!chat.members.includes(f._id));
      return res.status(200).json({sucess:true, availableFriends});

    }else{
      res.status(200).json({sucess:true, friends});
    }

    const chatIds = chats.map((i)=>({
      id : i._id 
    }))



    // Convert the Set of member  IDs to an array
    res.status(200).json({
      sucess: true,
      allMember: chatIds,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
