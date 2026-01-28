require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const animeRoutes = require("./routes/anime.routes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

// API
app.use("/api/animes", animeRoutes);

// fallback (important)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
