import { Router } from "express";
import { addLike, getLikes, removeLike } from "../controllers/like.js";

const router = Router();

router.get("/", getLikes);
router.post("/", addLike);
router.delete("/", removeLike);

export default router;
