import express from "express";
import {
  getStories,
  getStoryById,
  toggleBookmark,
  getBookmarks,
} from "../controllers/storyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getStories);
router.get("/bookmarks", protect, getBookmarks); // ⚠️ Must be BEFORE /:id
router.get("/:id", getStoryById);
router.post("/:id/bookmark", protect, toggleBookmark);

export default router;