import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { scrapeStories } from "./services/scraper.js";


dotenv.config();  
connectDB().then(() => {
  scrapeStories(); // auto run

  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});