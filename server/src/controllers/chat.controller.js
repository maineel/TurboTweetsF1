import { Chat } from "../models/chat.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const emitEvent = (req, event, users, data) => {
  console.log("Emitting event", event);
};

const newGroupChat = asyncHandler(async (req, res) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    throw new ApiError(400, "Group chat must have at least 3 members");
  }

  const allMembers = [...members, req.user];
  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, "newGroupChat", allMembers, { name });
});

const getMyChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name avatar"
  );

  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    return {
      _id,
      name: groupChat
        ? name
        : members.find((member) => member._id.toString() !== req.user).name,
      groupChat,
      members,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [
            members.find((member) => member._id.toString() !== req.user).avatar
              .url,
          ],
    };
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        transformedChats,
        "Chat partners fetched successfully"
      )
    );
});

const getMyGroups = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ members: req.user, groupChat: true }).populate(
    "members",
    "name avatar"
  );

  const groups = chats.map(({ _id, name, members }) => {
    return {
      _id,
      name,
      members,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    };
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200, 
        groups,
        "Group chats fetched successfully"
      )
    );
});

const addMember = asyncHandler(async (req, res) => {
  const { chatId, members } = req.body;

  const chat = await Chat.findById(chatId);

  if(!chat) {
    throw new ApiError(404, "Chat not found");
  }

  if(!chat.groupChat) {
    throw new ApiError(400, "Cannot add members to a personal chat");
  }

  if(chat.creator.toString() !== req.user) {
    throw new ApiError(403, "Only the creator can add members to the group");
  }

  const newMembersPromise = members.map((i) => User.findById(i, "name"));

  const allNewMembers = await Promise.all(newMembersPromise);

  chat.members.push(...allNewMembers.map((i) => i._id));

  await chat.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        "Member added successfully"
      )
    );
});

export { newGroupChat, getMyChats, getMyGroups, addMember };
