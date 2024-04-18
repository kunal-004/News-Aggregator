const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const API_KEY = "499d03534f224e8890dcd1f95376001c";
const NEWS_API_URL = "https://newsapi.org/v2/everything";

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", async (req, res) => {
  try {
    const query = req.query.query || "all";
    const data = await fetchData(query);
    res.render("index", { news: data.articles }); // Pass 'news' as a variable to the template
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).send("An error occurred while fetching news data.");
  }
});

// Fetch news data
async function fetchData(query) {
  const url = `${NEWS_API_URL}?q=${query}&apiKey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
