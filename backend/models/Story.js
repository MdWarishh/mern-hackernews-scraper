import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  title: String,
  url: { type: String, unique: true },
  points: Number,
  author: String,
  postedAt: String,
});

export default mongoose.model("Story", storySchema);