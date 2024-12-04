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
const rooms = {};

io.on("connection", (socket) => {
  socket.on("join", ({ name, code }) => {
    if (!rooms[code]) rooms[code] = [];

    socket.join(code);
    rooms[code].push(socket.id);
    console.log(`${name} join Room [${code}]`);

    const color = getRandomColor();
    users[socket.id] = { name, color };

    if (!!name) {
      const roomSize = io.sockets.adapter.rooms.get(code)?.size || 0;

      io.to(code).emit("connected", {
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
    disconnectUser();
  });

  // 페이지 종료 시
  socket.on("disconnecting", () => {
    disconnectUser();
  });

  const disconnectUser = () => {
    if (!users[socket.id]) return;

    const name = users[socket.id]?.name;
    console.log(`${name} leave Room`);

    delete users[socket.id];

    const count = Object.keys(users)?.length ?? 0;

    // 전체 count
    io.emit("disconnected", {
      count,
    });

    // 방에 있는 다른 사용자에게 퇴장 알림

    const color = users[socket.id]?.color;

    // 속한 모든 room
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        rooms[room] = rooms[room]?.filter((id) => id !== socket.id);

        let roomSize = rooms[room]?.length;
        if (roomSize === 0) {
          console.log(`!Room [${room}] Close!`);
          delete rooms[room];
        }

        // 본인을 제외한 room에 속한 모든 client에게
        socket.to(room).emit("disconnected room", {
          name,
          color,
          count,
          roomSize,
        });
      }
    }
  };
});

app.get("/user-count", (req, res) => {
  // res.send(Object.keys(users)?.length);
  let count = Object.keys(users)?.length;
  res.status(200).send({ count });
});

app.get("/room-check", (req, res) => {
  const roomIdInput = req?.query?.roomId;

  let selectedRoom = rooms[roomIdInput];
  let result = true;
  if (!selectedRoom || selectedRoom.length === 0) result = false;
  res.status(200).send({ result });
});

module.exports = app;
