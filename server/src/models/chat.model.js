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
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dcthtlmm0/image/upload/v1718109871/x3htmb9lm2trksgzjzgl.png",
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
