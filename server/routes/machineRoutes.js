const express = require("express");
const router = express.Router();
const Machine = require("../models/Machine");

// GET machines
router.get("/", async (req, res) => {
  try {
    const data = await Machine.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération machines" });
  }
});

// POST machine
router.post("/", async (req, res) => {
  try {
    const item = await Machine.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: "Erreur insertion machine" });
  }
});

module.exports = router;
