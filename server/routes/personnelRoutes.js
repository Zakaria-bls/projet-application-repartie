const express = require("express");
const router = express.Router();
const Personnel = require("../models/Personnel");

// GET – récupérer tout le personnel
router.get("/", async (req, res) => {
  try {
    const data = await Personnel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération personnel" });
  }
});

// POST – ajouter un employé
router.post("/", async (req, res) => {
  try {
    const item = await Personnel.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: "Erreur insertion personnel" });
  }
});

module.exports = router;
