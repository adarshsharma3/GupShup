import Conversation from "../models/conversationModel.js"
import Message from "../models/messageModel.js";
import { getReceiverSocketId,io } from "../socket/socket.js";

export const sendMessage=async(req,res)=>{
    try{
        const {message}=req.body;
        const {id : receiverId}=req.params;
        const senderId=req.user._id;
let conversation=await Conversation.findOne({
    members:{$all: [senderId,receiverId]},
})
console.log("Found conversation:", conversation);
if(!conversation){
    conversation=await Conversation.create({   // works as new Conversation but also saves the file on its own.
        members:[senderId,receiverId],
    })
    console.log("Created conversation:", conversation);
}
const newMessage =new Message({
    senderId,
    receiverId,
    message,
})

if(newMessage){
    conversation.messages.push(newMessage._id);
}
await Promise.all([conversation.save(),newMessage.save()]);

const receiverSocketId=getReceiverSocketId(receiverId);
if(receiverSocketId){
    io.to(receiverSocketId).emit("newMessage",newMessage)  //Sending messages only to
    //  the intended recipient ensures that the message is seen by the correct user and prevents any potential mix-up.
}



res.status(201).json(newMessage);
console.log("message sent");
// res.send("message sent");
    }
    catch(error){
     console.log("eror in message controller",error);
     res.status(401).json({error:"issue in sending Messgae"})
    }
};

export const getMessage=async(req,res)=>{
    try{
    
        const {id : userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation=await Conversation.findOne({
            members:{$all: [senderId,userToChatId]},
        }).populate("messages");
        // Populating Messages: The populate("messages") method tells Mongoose to replace each
        //  ObjectID in the messages array with the corresponding Message document from the messages collection.
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }
res.status(200).json(conversation.messages);
    }catch(error){
      console.log("get messages issue");
      res.status(402).json({errors:"Issue while getting message",error});
    }
};