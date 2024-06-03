import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content:{
        type: String,
    },
    attachments:{
        type: String,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
