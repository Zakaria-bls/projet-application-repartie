const mongoose = require("mongoose");

const PersonnelSchema = new mongoose.Schema({
  identifiant: { type: String, required: true }, // numéro de sécurité sociale
  nom: { type: String, required: true },
  prenom: { type: String, required: true },

  etat: {
    type: String,
    enum: ["actif", "repos", "arrêt maladie", "congé"],
    required: true
  },

  service: {
    type: String,
    enum: [
      "commercial", "finance et gestion", "ressources humaines", "juridique",
      "logistique", "assistance commerciale", "direction générale", "maintenance",
      "achats", "cyber sécurité", "recherche et développement", "informatique",
      "qualité", "collecte", "marketing", "industriel",
      "assistance technique", "analyse des données"
    ],
    required: true
  },

  frequence_cardiaque: { type: Number, required: true }, // bpm
  position: {
    latitude: Number,
    longitude: Number
  }
});

module.exports = mongoose.model("Personnel", PersonnelSchema);
