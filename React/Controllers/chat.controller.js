import Chat from "../Models/chat.js";
const chatController = {}

chatController.saveChat = async(message,user)=>{
    const newMessage = new Chat({
        chat:message,
        user:{
            id:user._id,
            name:user.name
        },
    })
    await newMessage.save();
    return newMessage;
}
export default chatController;