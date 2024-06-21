import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    senderName: {
      type: String,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: []
      },
    ],
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dcthtlmm0/image/upload/v1718109871/x3htmb9lm2trksgzjzgl.png",
    },
    senderAvatar: {
      type: String,
      default: "https://res.cloudinary.com/dcthtlmm0/image/upload/v1718109871/x3htmb9lm2trksgzjzgl.png",
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
