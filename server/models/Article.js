const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  identifiant_produit: { type: Number, required: true },
  zone: { type: Number, required: true },

  etat_emballage: { type: String, enum: ["Correct", "Déformé"], required: true },

  responsable: {
    type: String, // identifiant personnel
    required: true
  },

  position: {
    x: Number,
    y: Number,
    z: Number
  },

  rotation: {
    roll: Number,
    pitch: Number,
    yaw: Number
  },

  collisions: { type: Number, required: true }
});

module.exports = mongoose.model("Article", ArticleSchema);
