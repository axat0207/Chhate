import {
  ALERT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherId } from "../lib/helper.js";
import Chat from "../models/chat.js";
import User from "../models/user.js";
import { deletFilesFromCloudinary, emitEvent } from "../utils/features.js";
import Message from "../models/message.js";
import mongoose from "mongoose";

export async function newGroupChat(req, res) {
  try {
    const { name, memberIds } = req.body;

    if (memberIds.length < 2) {
      return res.status(400).json({
        error: "At least two members are required for creating group.",
      });
    }

    // Convert member IDs from string to ObjectId
    const members = memberIds.map((id) => new mongoose.Types.ObjectId(id));

    const allMembers = [...members, req.user._id];

    await Chat.create({
      name,
      groupChat: true,
      creator: req.user._id,
      members: allMembers,
    });

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members);

    res
      .status(201)
      .json({ success: true, message: "Group created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMyChats(req, res) {
  try {
    // Await the completion of the query to get actual data
    const chats = await Chat.find({ members: req.user._id }).populate(
      "members",
      "name avatar"
    );

    const transformedChats = chats.map(({ name, groupChat, _id, members }) => {
      const otherMember = getOtherId(members, req.user._id);
      return {
        _id,
        groupChat,
        members,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar.url)
          : [otherMember.avatar.url],
        name: groupChat ? name : otherMember.name,
      };
    });
    res.status(200).json({ success: true, chats: transformedChats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMyGroup(req, res) {
  try {
    const chats = await Chat.find({
      members: req.user,
      groupChat: true,
      creator: req.user,
    }).populate("members", " name avatar");
    const groups = chats.map(({ _id, groupChat, name, members }) => ({
      _id,
      name,
      groupChat,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    }));

    res.status(200).json({ sucess: true, groups });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export const addGroupMember = async (req, res) => {
  try {
    const { chatId, members } = req.body;

    // Check for chat ID and members validity
    if (!chatId) {
      return res.status(400).json({ message: "Please provide ChatId" });
    }
    if (!members || members.length < 1) {
      return res.status(400).json({ message: "At least 1 member is required" });
    }

    // Find the chat document
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    if (!chat.groupChat) {
      return res.status(400).json({ message: "This is not a group chat" });
    }

    // Check if the request user is the creator of the group
    if (chat.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to add members" });
    }

    // Fetch all members to be added if they exist
    const allMemberPromises = members.map((memberId) =>
      User.findById(memberId, "name _id")
    );
    const allNewMembers = await Promise.all(allMemberPromises);

    // Filter out already existing members and form an array of new unique member IDs
    const newMemberIds = allNewMembers.map((member) => member._id.toString());
    const uniqueMemberIds = newMemberIds.filter(
      (memberId) => !chat.members.includes(memberId)
    );

    // Check if adding members exceeds the limit
    if (chat.members.length + uniqueMemberIds.length > 100) {
      return res
        .status(400)
        .json({ message: "You can add a maximum of 100 members to a group" });
    }

    // Update the chat members and save
    chat.members.push(...uniqueMemberIds);
    await chat.save();

    // Gather names for response
    const allUserNames = allNewMembers.map((member) => member.name).join(", ");

    // Emit event for adding members
    emitEvent(
      req,
      ALERT,
      chat.members,
      `${allUserNames} added to group successfully`
    );

    // Send successful response
    res
      .status(200)
      .json({ success: true, message: `${allUserNames} added successfully` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const removeGroupmember = async (req, res) => {
  try {
    const { chatId, memberId } = req.body;
    if (!chatId) {
      res.status(400).json({ message: " Please provide chat id" });
    }
    if (!memberId) {
      res.status(400).json({ message: " Please provide member to remove" });
    }

    const chat = await Chat.findById(chatId);
    const userRemoved = await User.findById(memberId);
    if (req.user._id.toString() !== chat.creator.toString()) {
      res
        .status(400)
        .json({ message: " You are not allowed to remove member" });
    }

    if (chat.members.length < 3) {
      res.status(400).json({
        sucess: false,
        message: "group should have atleast 3 members",
      });
    }

    chat.members = chat.members.filter(
      (i) => i.toString() !== memberId.toString()
    );

    await chat.save();
    emitEvent(
      req,
      ALERT,
      chat.members,
      `${userRemoved.fullName} is removed form the group`
    );
    emitEvent(req, REFETCH_CHATS, chat.members);
    res
      .status(200)
      .json({ sucess: true, message: `member removed sucessfully` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const leaveGroup = async (req, res) => {
  try {
    const chatId = req.params.id;
    if (!chatId) {
      res.status(400).json({ sucess: false, message: "please provide chatId" });
    }
    const chat = await Chat.findById(chatId);
    const remainingMember = chat.members.filter(
      (i) => i.toString() !== req.user._id
    );

    if (chat.creator.toString() === req.user._id.toString()) {
      const randomElement = Math.floor(Math.random() * chat.members.length);
      chat.creator = remainingMember[randomElement];
      await chat.save();
    }

    emitEvent(
      req,
      ALERT,
      chat.members,
      `${req.user.fullName} has left the group`
    );
    chat.members = remainingMember;
    await chat.save();
    res.status(200).json({
      sucess: true,
      message: `${req.user._id} Left the group sucessfully`,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const sendAttahments = async (req, res) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      res.status(400).json({ sucess: false, message: "please provide chatId" });
    }

    const chat = await Chat.findById(chatId);
    const files = req.files || [];

    if (files.length < 1) {
      res
        .status(400)
        .json({ sucess: false, message: "please provide Attachments" });
    }

    if (!chat) {
      res.status(400).json({ sucess: false, message: "Chat not found" });
    }

    const attachment = [""];

    const messageForrealTime = {
      content: "",
      attachment,
      sender: {
        _id: req.user._id,
        name: req.user.fullName,
      },
      chat: chatId,
    };

    const messageForDB = {
      content: "",
      attachment,
      sender: req.user._id,
      chat: chatId,
    };

    const message = await Message.create(messageForDB);

    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });
    res.status(200).json({ sucess: true, message });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const getChatDetails = async (req, res, next) => {
  try {
    if (req.query.populate === "true") {
      const chat = await Chat.findById(req.params.id)
        .populate("members", "name avatar")
        .lean();

      if (!chat) {
        return next(new ErrorHandler("Chat not found", 404));
      }

      chat.members = chat.members.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar ? avatar.url : null,
      }));

      return res.status(200).json({
        success: true,
        chat,
      });
    } else {
      const chat = await Chat.findById(req.params.id);
      if (!chat) {
        return next(new ErrorHandler("Chat not found", 404));
      }

      return res.status(200).json({
        success: true,
        chat,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const renameGroup = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    const { name } = req.body;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      res.status(400).json({ sucess: false, message: "Chat not found" });
    }

    if (!chat.groupChat) {
      res
        .status(400)
        .json({ sucess: false, message: "This is not a group chat" });
    }

    if (chat.creator.toString() !== req.user._id.toString()) {
      res
        .status(403)
        .json({
          sucess: false,
          message: "You are not allowed to rename the group",
        });
    }

    chat.name = name;
    await chat.save();
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
      success: true,
      message: "Group renamed successfully",
    });
  } catch (error) {
    res.send(error.message);
  }
};

export const deleteChat = async (req, res, next) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      res.status(400).json({ sucess: false, message: "Chat not found" });
    }
    console.log(chat.creator.toString() + "\n" + req.user._id.toString());

    if (chat.groupChat && chat.creator.toString() !== req.user._id.toString()) {
      res
        .status(403)
        .json({
          sucess: false,
          message: "You are not allowed to delete the group",
        });
    }

    const members = chat.members;
    if (!chat.groupChat && !chat.members.includes(req.user._id.toString())) {
      res
        .status(403)
        .json({
          sucess: false,
          message: "You are not allowed to delete the group",
        });
    }

    const messagesWithAttachments = await Message.find({
      chat: chatId,
      attachments: { $exists: true, $ne: [] },
    });

    const public_ids = [];

    messagesWithAttachments.forEach(({ attachments }) =>
      attachments.forEach(({ public_id }) => public_ids.push(public_id))
    );

    await Promise.all([
      deletFilesFromCloudinary(public_ids),
      chat.deleteOne(),
      Message.deleteMany({ chat: chatId }),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.send(error.message);
  }
};

export const getMessage = async (req, res) => {
  try {
    const chatId = req.params.id;
    const { page = 1 } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;

    const [message, totalMessageCount] = await Promise.all([
      Message.find({ chat: chatId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("sender", "name")
        .lean(),
        Message.countDocuments({ chat: chatId }),
    ]);

    const totalPages = Math.ceil(totalMessageCount/limit)
    return res.status(200).json({
      success: true,
      messages: message.reverse(),
      totalPages,
    });
  } catch (error) {
    res.send(error.message);
  }
};
