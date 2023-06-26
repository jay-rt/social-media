import { Router } from "express";
import { getUser, updateUser, userSuggestion } from "../controllers/user.js";

const router = Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);
router.get("/suggestions", userSuggestion);

export default router;
