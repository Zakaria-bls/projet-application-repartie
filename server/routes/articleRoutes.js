const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// GET articles
router.get("/", async (req, res) => {
  try {
    const data = await Article.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération articles" });
  }
});

// POST article
router.post("/", async (req, res) => {
  try {
    const item = await Article.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: "Erreur insertion article" });
  }
});

// GET nombre d'articles avec un emballage correct
router.get("/correct-count", async (req, res) => {
  try {
    const count = await Article.countDocuments({ etat_emballage: "Correct" });
    res.json({ total_correct: count });
  } catch (err) {
    res.status(500).json({ error: "Erreur dans le comptage" });
  }
});

// GET nombre d'articles avec un emballage correct
router.get("/deforme-count", async (req, res) => {
  try {
    const count = await Article.countDocuments({ etat_emballage: "Déformé" });
    res.json({ total_deforme: count });
  } catch (err) {
    res.status(500).json({ error: "Erreur dans le comptage" });
  }
});

// GET article avec le moins de collisions
router.get("/least-collisions", async (req, res) => {
  try {
    const article = await Article.findOne().sort({ collisions: 1 }); // tri croissant par collisions
    if (!article) {
      return res.status(404).json({ error: "Aucun article trouvé" });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération article avec le moins de collisions" });
  }
});
  


module.exports = router;
