const mongoose = require("mongoose");

const SurveillanceSchema = new mongoose.Schema({
  zone: { type: Number, required: true },

  drones_actifs: { type: Number, required: true },
  drones_panne: { type: Number, required: true },
  drones_recharge: { type: Number, required: true },

  detection_incendie: { type: Boolean, required: true },

  detection_forme: {
    type: String,
    enum: ["aucune", "personnel non identifiée", "objet non identifié"],
    required: true
  },

  audit_conformite: { type: Boolean, required: true }
});

module.exports = mongoose.model("Surveillance", SurveillanceSchema);
