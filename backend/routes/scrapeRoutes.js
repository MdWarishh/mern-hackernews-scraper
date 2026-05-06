import express from "express";
import { scrapeStories } from "../services/scraper.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = await scrapeStories();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;