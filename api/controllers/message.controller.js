import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

// Create a new message
export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });

  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );
    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};

// Get messages for a conversation
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id }).sort({ createdAt: 1 });
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};
