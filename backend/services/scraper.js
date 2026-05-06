import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";

export const scrapeStories = async () => {
  const { data } = await axios.get("https://news.ycombinator.com");
  const $ = cheerio.load(data);

  const stories = [];

  $(".athing").slice(0, 10).each((i, el) => {
    const title = $(el).find(".titleline a").text();
    const url = $(el).find(".titleline a").attr("href");

    const subtext = $(el).next().find(".subtext");
    const pointsText = subtext.find(".score").text();
    const points = parseInt(pointsText) || 0;
    const author = subtext.find(".hnuser").text();
    const time = subtext.find(".age").text();

    stories.push({
      title,
      url,
      points,
      author,
      postedAt: time,
    });
  });

  // save to DB
  for (let story of stories) {
    await Story.updateOne(
      { url: story.url },
      { $set: story },
      { upsert: true }
    );
  }

  return stories;
};