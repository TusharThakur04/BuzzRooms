import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import login from "./routes/login.js";
import trends from "./routes/trends.js";
import cors from "cors";
import { Server } from "socket.io";
import storeMsg from "./controllers/storingMsg.js";

const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", login);
app.get("/", (req, res) => {
  res.send("buzzroom backend is running");
});

app.use("/trends", trends);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on("send_message", ({ room, message, sender, username, clerkId }) => {
    console.log(`Msg in ${room} from ${sender}: ${message}`);
    storeMsg(message, clerkId);
    io.to(room).emit("receive_message", {
      message,
      sender,
      username,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
