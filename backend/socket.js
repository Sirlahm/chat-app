const jwt = require("jsonwebtoken");
const User = require("./model/user");

let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server);
    io.use(async (socket, next) => {
      try {
        const token = socket.handshake.query.token;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = await User.findById(payload.id);
        next();
      } catch (err) {}
    });

    io.on("connection", (socket) => {
      console.log("Connected: " + socket.user.userName);

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
