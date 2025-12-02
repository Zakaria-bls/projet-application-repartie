const mongoose = require("mongoose");

const OperationSchema = new mongoose.Schema({
  identifiant: { type: Number, required: true },
  type: { type: String, enum: ["Achat", "Vente"], required: true },

  responsable: {
    type: String, // identifiant personnel (SSN)
    required: true
  },

  marge: { type: Number, required: true }, // en euros
  kilometres: { type: Number, required: true },

  mot_responsable: { type: String, required: true },
  mot_client: { type: String, required: true }
});

module.exports = mongoose.model("Operation", OperationSchema);
