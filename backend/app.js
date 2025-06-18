import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("buzzrooms");
});

app.listen(8000, () => {
  console.log("running");
});
