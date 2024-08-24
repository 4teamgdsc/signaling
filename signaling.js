export async function socket(io) {
  let users = [];
  io.on("connection", (socket) => {
    socket.join("room_" + socket.decoded);

    socket.on("test", () => {
      console.log("OTT");
    });

    socket.on("addUser", (userId) => {
      if (!users.includes(userId)) {
        users.push(userId);
        io.to("room_" + socket.decoded).emit("nowUsers", users);
      }
    });

    socket.on("data", (userId, position) => {
      io.to("room_" + socket.decoded).emit("rcvData", userId, position);
    });

    socket.on("dataRotation", (userId, rotation) => {
      io.to("room_" + socket.decoded).emit("rcvDataRotation", userId, rotation);
    });

    socket.on("reset", () => {
      users = [];
    });

    socket.on("newIceCandidate", (message) => {
      io.to("room_" + socket.decoded).emit("iceCandidate", message);
    });

    socket.on("answer", (message) => {
      io.to("room_" + socket.decoded).emit("message", message);
    });

    socket.on("offer", (message) => {
      io.to("room_" + socket.decoded).emit("messageoffer", message);
    });
  });
}
