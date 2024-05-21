import { Chat } from "../models/chat.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getChatPartners = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const chats = await Chat.find({
    $or: [{ sender: userId }, { receiver: userId }],
  }).sort({ timestamp: -1 });

  if (!chats) {
    throw new ApiError(404, "No chats found");
  }

  const chatPartners = chats.map((chat) =>
    chat.sender.toString() === userId ? chat.receiver : chat.sender
  );

  const uniqueChatPartners = [...new Set(chatPartners)];

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Chat Partners fetched successfully",
        uniqueChatPartners
      )
    );
});

const getChat = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.params;
  const chats = await Chat.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  }).sort({ timestamp: 1 });

  if (!chats) {
    throw new ApiError(404, "No chats found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Chat fetched successfully", chats));
});

const createChat = asyncHandler(async (req, res) => {
  const { sender, receiver, message } = req.body;
  const chat = new Chat({
    sender,
    receiver,
    message,
    timestamp: Date.now(),
  });
  const savedChat = await chat.save();
  return res
    .status(201)
    .json(new ApiResponse(201, "Chat created successfully", savedChat));
});

const updateChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { message } = req.body;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  chat.message = message;
  await chat.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Chat updated successfully", chat));
});

const deleteChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }
  await chat.remove();
  return res
    .status(200)
    .json(new ApiResponse(200, "Chat deleted successfully", chat));
});

export { getChatPartners, getChat, createChat, updateChat, deleteChat };
