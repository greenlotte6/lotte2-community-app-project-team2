import chatController from "../Controllers/chat.controller.js";
import userController from "../Controllers/user.controller.js";

export default function (io) {
  io.on("connection", async (socket) => {
    console.log("connected", socket.id);

    socket.on("login", async (userName, cb) => {
      try {
        const user = await userController.saveUser(userName, socket.id);
        const welcomeMessage = {
         chat: `${user.name} 가 참여했습니다.`,
         user: {id:null, name:"system"},
        };
        io.emit("message",welcomeMessage);
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("sendMessage", async (message, cb) => {
      try{
        const user = await userController.checkUser(socket.id);
        const newMessage = await chatController.saveChat(message, user);
         io.emit("message",newMessage)
         cb({ok:true});
      }catch(error){
         cb({ ok: false, error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
}
