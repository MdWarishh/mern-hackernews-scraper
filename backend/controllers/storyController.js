import Story from "../models/Story.js";
import User from "../models/User.js";

// GET ALL STORIES
export const getStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const total = await Story.countDocuments();

    const stories = await Story.find()
      .sort({ points: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: stories,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE STORY
export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Not found" });

    res.json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE BOOKMARK
export const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const storyId = req.params.id;

    const isBookmarked = user.bookmarks.includes(storyId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== storyId
      );
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();

    res.json({
      message: isBookmarked ? "Removed bookmark" : "Added bookmark",
      bookmarks: user.bookmarks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("bookmarks");

    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};