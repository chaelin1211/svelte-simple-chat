const { getRandomColor } = require("./color.cjs");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Apply CORS middleware globally
app.use(
  cors({
    origin: process.env.FRONT_URL,
    // credentials: true // Enable cookies if needed
  }),
);

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = socketIo(server, { cors: { origin: process.env.FRONT_URL } }); // Set CORS for Socket.IO

const users = {};
io.on("connection", (socket) => {
  socket.on("init", ({ name }) => {
    users[socket.id] = name;

    if (!!name) {
      io.emit("connected", {
        id: socket.id,
        name,
        color: getRandomColor(),
        count: Object.keys(users)?.length,
      });
    }
  });

  socket.on("message", (message) => {
    io.emit("message", { id: socket.id, name: users[socket.id], message });
  });

  socket.on("leave", () => {
    let name = users[socket.id];
    delete users[socket.id];
    if (!!name) {
      io.emit("disconnected", {
        id: socket.id,
        name,
        count: Object.keys(users)?.length,
      });
    }
  });

  socket.on("disconnect", () => {
    let name = users[socket.id];
    delete users[socket.id];
    if (!!name) {
      io.emit("disconnected", {
        id: socket.id,
        name,
        count: Object.keys(users)?.length,
      });
    }
  });
});

app.get("/user-count", (req, res) => {
  // res.send(Object.keys(users)?.length);
  let count = Object.keys(users)?.length;
  res.status(200).send({ count });
});

module.exports = app;
