import express from "express";
import {
  getStories,
  getStoryById,
  toggleBookmark,
} from "../controllers/storyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getStories);
router.get("/:id", getStoryById);
router.post("/:id/bookmark", protect, toggleBookmark);

export default router;