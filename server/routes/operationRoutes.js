const express = require("express");
const router = express.Router();
const Operation = require("../models/Operation");
const Personnel = require("../models/Personnel");

// GET responsable name with total kilometers
router.get("/top-responsable-km-with-name", async (req, res) => {
  try {
    const result = await Operation.aggregate([
      // 1. Group by responsable (SSN) and sum kilometers
      {
        $group: {
          _id: "$responsable",
          totalKilometres: { $sum: "$kilometres" }
        }
      },
      // 2. Join with Personnel to get name
      {
        $lookup: {
          from: "personnels",          // collection name in MongoDB (usually lowercase + plural)
          localField: "_id",            // responsable SSN
          foreignField: "identifiant",  // Personnel.identifiant
          as: "personnelInfo"
        }
      },
      // 3. Flatten the array from $lookup
      { $unwind: "$personnelInfo" },
      // 4. Sort descending by totalKilometres
      { $sort: { totalKilometres: -1 } },
      // 5. Limit to top 1
      { $limit: 1 },
      // 6. Project only needed fields
      {
        $project: {
          _id: 0,
          identifiant: "$_id",
          nom: "$personnelInfo.nom",
          prenom: "$personnelInfo.prenom",
          totalKilometres: 1
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Aucun responsable trouvé" });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération responsable" });
  }
});


// GET montant total de toutes les ventes
router.get("/total-ventes", async (req, res) => {
  try {
    const result = await Operation.aggregate([
      // 1. Filtrer uniquement les ventes
      { $match: { type: "Vente" } },
      // 2. Somme du champ marge
      {
        $group: {
          _id: null,
          totalVentes: { $sum: "$marge" }
        }
      },
      // 3. Projetter pour ne pas inclure _id
      {
        $project: {
          _id: 0,
          totalVentes: 1
        }
      }
    ]);

    const totalVentes = result[0]?.totalVentes || 0;

    res.json({ totalVentes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur calcul montant total des ventes" });
  }
});


module.exports = router;
