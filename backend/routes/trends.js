import { Router } from "express";
import { fetchTrends } from "../controllers/fetchTrends.js";

const router = Router();

router.get("/", fetchTrends);

export default router;
