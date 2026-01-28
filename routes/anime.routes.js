const express = require("express");
const router = express.Router();
const db = require("../db");

// GET semua anime
router.get("/", (req, res) => {
  db.query("SELECT * FROM animes ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// POST tambah anime
router.post("/", (req, res) => {
  const {
    title,
    year,
    genre,
    episodes,
    notes,
    category,
    poster,
    characters
  } = req.body;

  const sql = `
    INSERT INTO animes
    (title, year, genre, episodes, notes, category, poster, characters)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      year,
      genre,
      episodes,
      notes,
      category,
      poster,
      JSON.stringify(characters)
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true, id: result.insertId });
    }
  );
});

// DELETE anime
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM animes WHERE id = ?",
    [req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

module.exports = router;
