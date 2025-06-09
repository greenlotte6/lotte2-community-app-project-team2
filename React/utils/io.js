export default function(io) {
 //io~~~~
 io.on("connection",async(socket)=>{
    console.log("connected",socket.id)
 })
};