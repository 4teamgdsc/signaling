export async function socket(io) {
  io.use(function (socket, next) {
    next();
  }).on("connection", (socket) => {
    socket.join("room_" + socket.decoded);

    socket.on("test", () => {
      console.log("OTT");
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
