import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
  ],
});

export default mongoose.model("User", userSchema);