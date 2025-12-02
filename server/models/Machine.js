const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema({
  reference: { type: Number, required: true },
  zone: { type: Number, required: true },

  premiere_mise_service: { type: Date, required: true },

  cadence: { type: Number, required: true }, // L/h

  etat: {
    type: String,
    enum: ["arrêt", "active", "panne", "entretien", "réparation"],
    required: true
  },

  prochain_entretien: { type: Date, required: true },

  utilisateur_actuel: {
    type: String, // identifiant personnel
    required: true
  }
});

module.exports = mongoose.model("Machine", MachineSchema);
