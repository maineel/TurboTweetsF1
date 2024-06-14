import { Chat } from "../models/chat.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Message } from "../models/message.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const emitEvent = (req, event, users, data) => {
  console.log("Emitting event", event);
};

const uploadAttachement = asyncHandler(async (req, res) => {
    const attachementLocalPath = req.file?.path;
    
    const response = await uploadOnCloudinary(attachementLocalPath);
    
    if (response.error) {
        throw new ApiError(400, response.error.message);
    }
    
    return res
        .status(200)
        .json(new ApiResponse(200, response, "Attachement uploaded successfully"));
});

const newMessage = asyncHandler(async (req, res) => {
    const { chatId, content } = req.body;
    
    const message = await Message.create({
        sender: req.user._id,
        chat: chatId,
        content,
    });

    // const chat = await Chat.findById(chatId);
    // chat.messages.push(message._id);
    // await chat.save();

    // emitEvent(req, "newMessage", chat.members, { chatId, message });

    return res
        .status(201)
        .json(new ApiResponse(201, message, "Message sent successfully"));
});

const editMessage = asyncHandler(async (req, res) => {
    const { messageId, content } = req.body;

    const message = await Message.findById(messageId);
    const chat = await Chat.findById(message.chat);

    if (!message) {
        throw new ApiError(404, "Message not found");
    }

    if (message.sender.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not allowed to edit this message");
    }

    message.content = content;
    chat.messages = chat.messages.map((msg) => {
        if (msg._id.toString() === message._id.toString()) {
            return message;
        }
        return msg;
    })

    await message.save();

    return res
        .status(200)
        .json(new ApiResponse(200, message, "Message edited successfully"));
});

const searchMessage = asyncHandler(async (req, res) => {
    const { chatId, query } = req.query;

    const chat = await Chat.findById(chatId);

    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }

    const messages = await Message.find({
        chat: chatId,
        content: { $regex: query, $options: "i" },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, messages, "Messages retrieved successfully"));
});

export { uploadAttachement, newMessage, editMessage, searchMessage };