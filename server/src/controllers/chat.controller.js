import { Chat } from "../models/chat.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Message } from "../models/message.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const emitEvent = (req, event, users, data) => {
  console.log("Emitting event", event);
};

const uploadChatAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  const response = await uploadOnCloudinary(avatarLocalPath);

  if (response.error) {
    throw new ApiError(400, response.error.message);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, response, "Chat avatar uploaded successfully"));
});

const newGroupChat = asyncHandler(async (req, res) => {
  const { name, members } = req.body;
  const { avatarLocalPath } = req.file?.path;

  if (members.length < 2) {
    throw new ApiError(400, "Group chat must have at least 3 members");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const allMembers = [...members, req.user._id];
  await Chat.create({
    name,
    groupChat: true,
    creator: req.user._id,
    members: allMembers,
    avatar: avatar.url,
  });

  emitEvent(req, "newGroupChat", allMembers, { name });
});

const addMembers = asyncHandler(async (req, res) => {
  const { chatId, members } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  const allMembers = [...chat.members, ...members];
  chat.members = allMembers;
  await chat.save();

  emitEvent(req, "addMembers", allMembers, { name: chat.name });

  return res
    .status(200)
    .json(new ApiResponse(200, chat, "Members added successfully"));
});

const personalChat = asyncHandler(async (req, res) => {
  
  const { recipient, user } = req.body;

  const recipientUser = await User.findOne({ userName: recipient });

  const chatExists = await Chat.findOne({
    members: { $all: [user._id, recipientUser._id], $size: 2 },
  });
  
  if (chatExists) {
    throw new ApiError(200, chatExists, "Chat already exists");
  }

  const chat = await Chat.create({
    name: recipientUser.userName,
    groupChat: false,
    creator: user._id,
    members: [user._id, recipientUser._id],
    avatar: recipientUser.avatar.url,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, chat, "Chat created successfully"));
});

const getMyChats = asyncHandler(async (req, res) => {
  const {user} = req.params;
  const chats = await Chat.find({ members: user }).sort("-updatedAt");

  return res
    .status(200)
    .json(new ApiResponse(200, chats, "Chats retrieved successfully"));
});

const searchChat = asyncHandler(async (req, res) => {
  const { query } = req.query;

  const chats = await Chat.find({
    name: { $regex: query, $options: "i" },
    members: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, chats, "Chats retrieved successfully"));
});

const addMessageToChat = asyncHandler(async (req, res) => {
  const { userId, chatId, content } = req.body;
  
  const message = await Message.create({
    sender: userId,
    chat: chatId,
    content,
  });

  const chat = await Chat.findById(chatId);
  chat.messages.push(message._id);
  await chat.save();

  emitEvent(req, "newMessage", chat.members, { chatId, message });

  return res
    .status(201)
    .json(new ApiResponse(201, chat, "Message sent successfully"));
});

export {
  uploadChatAvatar,
  newGroupChat,
  addMembers,
  personalChat,
  getMyChats,
  searchChat,
  addMessageToChat
};
