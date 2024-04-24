import User from "../models/user.js";
import Chat from "../models/chat.js";
import Message from "../models/message.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../utils/features.js";
export const adminLogin = async (req, res) => {
  try {
    const { secretKey } = req.body;
    if (!secretKey) {
      res.status(400).json({ sucess: true, message: "Secret Key is required" });
    }
    const adminSecret = process.env.ADMIN_SECRET_KEY;
    if (adminSecret !== secretKey) {
      return res.status(401).send("Unauthorized Access only Admin can access");
    }
    const token = jwt.sign(secretKey, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("chattuAdmin", token, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 15,
      })
      .json({ success: true, data: "Admin logged in successfully, Welcome Boss" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const adminLogout = async (req, res) => {
    try {
        res
        .status(200)
        .cookie("chattuAdmin", "", {
          ...cookieOptions,
          maxAge: 0,
        })
        .json({ success: true, data: "Admin logged Out successfully, Bye Boss" });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
export const allUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const modifieduser = await Promise.all(
      users.map(async ({ _id, fullName, username, avatar }) => {
        const [group, friends] = await Promise.all([
          Chat.countDocuments({ groupChat: true, members: _id }),
          Chat.countDocuments({ groupChat: false, members: _id }),
        ]);
        return {
          _id,
          fullName,
          username,
          avatar: avatar.url,
          group,
          friends,
        };
      })
    );
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const allChats = async (req, res) => {
  try {
    const chats = await Chat.find({})
      .populate("members", "fullName avatar")
      .populate("creator", "fullName avatar");

    const modifiedChat = await Promise.all(
      chats.map(async ({ members, _id, creator, name, groupChat }) => {
        const totalMessage = await Message.countDocuments({ chat: _id });
        return {
          _id,
          name,
          groupChat,
          avatar: members.slice(0, 3).map((member) => member.avatar.url),
          members: members.map(({ _id, fullName, avatar }) => ({
            _id,
            fullName,
            avatar: avatar.url || "",
          })),
          creator: {
            name: creator?.fullName || "None",
            avatar: creator?.avatar.url || "",
          },
          totalMembers: members.length,
          totalMessage,
        };
      })
    );
    res.status(200).json(modifiedChat);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
export const allMessage = async (req, res) => {
  try {
    const messages = await Message.find({})
      .populate("sender", "name avatar")
      .populate("chat", "groupChat");

    const modifiedMessages = messages.map(
      ({ content, attachments, _id, sender, createdAt, chat }) => ({
        content,
        _id,
        attachments,
        createdAt,
        chat: chat._id,
        groupChat: chat.groupChat,
        sender: {
          _id: sender._id,
          fullName: sender.fullName,
          avatar: sender.avatar.url,
        },
      })
    );
    res.status(200).json(modifiedMessages);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
export const stats = async (req, res) => {
  try {
    const [groupCount, usersCount, messageCount, chatsCount] =
      await Promise.all([
        Chat.countDocuments({ groupChat: true }),
        User.countDocuments(),
        Message.countDocuments(),
        Chat.countDocuments(),
      ]);

    const today = new Date();
    const last7day = new Date();
    last7day.setDate(last7day.getDate() - 7);

    const last7dayMessage = await Message.find({
      createdAt: {
        $gte: last7day,
        $lte: today,
      },
    }).select("createdAt");

    const message = new Array(7).fill(0);

    last7dayMessage.forEach((msg) => {
      const indexApprox =
        (today.getTime() - msg.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      const index = Math.floor(indexApprox);
      message[6 - index]++;
    });

    const stat = {
      groupCount,
      usersCount,
      messageCount,
      chatsCount,
      messageChat: message,
    };
    res.status(200).json(stat);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
