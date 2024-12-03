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
  socket.on("join", ({ name, code }) => {
    socket.join(code);
    console.log(`${name} join Room: ${code}`);

    const color = getRandomColor();
    users[socket.id] = { name, color };

    if (!!name) {
      const roomSize = io.sockets.adapter.rooms.get(code)?.size || 0;

      io.emit("connected", {
        id: socket.id,
        code,
        name,
        color,
        count: Object.keys(users)?.length ?? 0,
        roomSize,
      });
    }
  });

  socket.on("message", ({ message, code }) => {
    io.to(code).emit("message", {
      id: socket.id,
      ...users[socket.id],
      message,
    });
  });

  // 페이지 이동 시
  socket.on("leave", () => {
    console.log(`${socket.id} leave Room`);
    disconnectUser();
  });

  // 페이지 종료 시
  socket.on("disconnecting", () => {
    console.log(`${socket.id} disconnecting Room`);
    disconnectUser();
  });

  const disconnectUser = () => {
    if (!users[socket.id]) return;

    const name = users[socket.id]?.name;
    console.log(`${name} leave Room`);

    delete users[socket.id];

    const roomSize = socket.rooms?.size - 1;
    const count = Object.keys(users)?.length ?? 0;

    // 전체 count
    io.emit("disconnected", {
      count,
    });

    // 방에 있는 다른 사용자에게 퇴장 알림
    if (roomSize > 0) {
      const color = users[socket.id]?.color;

      for (const room of socket.rooms) {
        if (room !== socket.id) {
          socket.to(room).emit("disconnected room", {
            name,
            color,
            count,
            roomSize,
          });
        }
      }
    }
  };
});

app.get("/user-count", (req, res) => {
  // res.send(Object.keys(users)?.length);
  let count = Object.keys(users)?.length;
  res.status(200).send({ count });
});

module.exports = app;
