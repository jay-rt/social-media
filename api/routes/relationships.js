import { Router } from "express";
import {
  addRelation,
  deleteRelation,
  getRelation,
} from "../controllers/relationship.js";

const router = Router();

router.get("/", getRelation);
router.post("/", addRelation);
router.delete("/", deleteRelation);

export default router;
