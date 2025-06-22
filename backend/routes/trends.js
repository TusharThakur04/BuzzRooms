import { Router } from "express";
import { fetchTrends } from "../controllers/fetchTrends";

const router = Router();

router.get("/", fetchTrends);

export default router;
