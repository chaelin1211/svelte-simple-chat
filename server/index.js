const { getRandomColor } = require("./color.cjs");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();

// Apply CORS middleware globally
app.use(
  cors({
    origin: "http://localhost:5173",
    // credentials: true // Enable cookies if needed
  }),
);

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = socketIo(server, { cors: { origin: "http://localhost:5173" } }); // Set CORS for Socket.IO

const users = {};
io.on("connection", (socket) => {
  socket.on("init", ({ name }) => {
    users[socket.id] = name;

    if (!!name) {
      io.emit("connected", { id: socket.id, name, color: getRandomColor() });
    }
  });

  socket.on("message", (message) => {
    io.emit("message", { id: socket.id, name: users[socket.id], message });
  });

  socket.on("disconnect", () => {
    let name = users[socket.id];
    if (!!name) {
      io.emit("disconnected", { id: socket.id, name });
    }
  });
});
