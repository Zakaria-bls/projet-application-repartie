const express = require("express");
const router = express.Router();
const Surveillance = require("../models/Surveillance");



// GET nombre de zones avec incendie détecté
router.get("/incendies-count", async (req, res) => {
  try {
    const count = await Surveillance.countDocuments({ detection_incendie: true });
    res.json({ total_incendies: count });
  } catch (err) {
    res.status(500).json({ error: "Erreur comptage incendies" });
  }
});


module.exports = router;
