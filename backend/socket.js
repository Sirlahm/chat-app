const jwt = require("jsonwebtoken");
const User = require("./model/user");
const Message = require("./model/message");
const dotenv = require("dotenv").config();

let io;
const connectedUsers = {};
module.exports = {
  init: (server) => {
    io = require("socket.io")(server);
    io.use(async (socket, next) => {
      try {
        const token = socket.handshake.query.token;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = await User.findById(payload.id);
    
        // Store the socket using the user's ID
        connectedUsers[payload.id] = socket;
    
        next();
      } catch (err) {
        console.log(err);
      }
    });
    
    io.on("connection", (socket) => {
      console.log("Connected: " + socket.user.userName);
    
      socket.on("send-message", async (data) => {
        try {
          const { senderId, receiverId, content } = data;
          const newMessage = new Message({
            senderId,
            receiverId,
            content,
            timestamp: new Date(),
          });
          await newMessage.save();
          socket.emit("receive-message", newMessage);
    
          // Emit the message to the receiver's socket if it's connected
          if (connectedUsers[receiverId]) {
            connectedUsers[receiverId].emit("receive-message", newMessage);
          }
        } catch (error) {
          console.error("Error sending message:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("Disconnected: " + socket.user.userName);
      });
    });
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  },
};
