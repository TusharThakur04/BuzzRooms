import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import login from "./routes/login.js";
import trends from "./routes/trends.js";
import cors from "cors";
import { Server } from "socket.io";
import storeMsg from "./controllers/storingMsg.js";
import fetchPrevMsgs from "./controllers/fetchPrevMsgs.js";

const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "development") {
  app.use(cors());
} else {
  app.use(cors({ origin: "https://buzz-rooms.vercel.app" }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", login);
app.get("/", (req, res) => {
  res.send("buzzroom backend is running");
});

app.use("/trends", trends);

let corsOptions = {};

if (process.env.NODE_ENV === "development") {
  corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  };
} else {
  corsOptions = {
    origin: "https://buzz-rooms.vercel.app",
    methods: ["GET", "POST"],
  };
}

const io = new Server(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", async (room) => {
    socket.join(room);

    // Fetch previous messages for the room

    const prevMessages = await fetchPrevMsgs(room);
    if (prevMessages) {
      io.to(room).emit("previous_messages", prevMessages);
      console.log(`Previous messages for room ${room}:`, prevMessages);
    } else {
      console.log(`No previous messages found for room: ${room}`);
    }

    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on("send_message", ({ room, message, sender, username, clerkId }) => {
    console.log(`Msg in ${room} from ${sender}: ${message}`);
    storeMsg(message, clerkId, room);
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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
