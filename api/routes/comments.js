import { Router } from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/comment.js";

const router = Router();

router.get("/", getComments);
router.post("/", addComment);
router.delete("/:id", deleteComment);

export default router;
