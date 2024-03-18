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
let connectors = 0;

io.on("connection", (socket) => {
  console.log("connected: " + socket.id);
  let name = "";
  connectors++;
  socket.on("message", ({ name, message }) => {
    io.emit("message", name + ": " + message);
  });

  socket.on("disconnect", () => {
    console.log("disconnected: " + socket.id);
    io.emit("disconnected", { connectors, name });
    connectors--;
  });
});