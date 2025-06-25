import * as cheerio from "cheerio";
export const fetchTrends = async (req, res) => {
  try {
    const region = req.query.region || "india";
    const response = await fetch(`https://trends24.in/${region}/`);
    const html = await response.text();

    const $ = cheerio.load(html);

    const trends = [];

    // extract trends from the page

    $("ol.trend-card__list li a").each((i, el) => {
      const name = $(el).text().trim();
      trends.push({
        id: i,
        name,
      });
    });
    console.log("Trends fetched:", trends);

    res.json(trends.slice(0, 30));
  } catch (err) {
    console.error("Scraping failed", err);
    res.status(500).json({ error: "Failed to fetch trends" });
  }
};
