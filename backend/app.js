import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import login from "./routes/login.js";
import cors from "cors";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", login);
app.get("/", (req, res) => {
  res.send("buzzroom backend is running");
});

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8000");
});
