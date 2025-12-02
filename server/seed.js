const mongoose = require("mongoose");

// ------------------- CONNECT TO ATLAS -------------------
const MONGO_URI = "mongodb+srv://zakariaboulsane_db_user:2ndmeirJFyqtMuCD@cluster0.klmmhcc.mongodb.net/innov3d?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("🌱 Connected to MongoDB - preparing seed..."))
  .catch(err => console.log("❌ DB Connection Error:", err));

// ------------------- MODELS -------------------

// PERSONNEL
const Personnel = require("./models/Personnel");

// OPERATIONS
const Operation = require("./models/Operation");

// ARTICLES
const Article = require("./models/Article");

// MACHINES
const Machine = require("./models/Machine");

// SURVEILLANCE
const Surveillance = require("./models/Surveillance");


// ------------------- DATA -------------------

// 15 PERSONNEL
const personnels = [
  {
    identifiant: "123456789001",
    nom: "Martin",
    prenom: "Alice",
    etat: "actif",
    service: "qualité",
    frequence_cardiaque: 75,
    position: { latitude: -33.86, longitude: 151.20 }
  },
  {
    identifiant: "123456789002",
    nom: "Durand",
    prenom: "Lucas",
    etat: "repos",
    service: "maintenance",
    frequence_cardiaque: 68,
    position: { latitude: -33.90, longitude: 151.18 }
  },
  {
    identifiant: "123456789003",
    nom: "Morel",
    prenom: "Emma",
    etat: "actif",
    service: "informatique",
    frequence_cardiaque: 70,
    position: { latitude: -33.85, longitude: 151.25 }
  },
  {
    identifiant: "123456789004",
    nom: "Petit",
    prenom: "Noah",
    etat: "arrêt maladie",
    service: "juridique",
    frequence_cardiaque: 90,
    position: { latitude: -33.84, longitude: 151.22 }
  },
  {
    identifiant: "123456789005",
    nom: "Robert",
    prenom: "Chloe",
    etat: "congé",
    service: "collecte",
    frequence_cardiaque: 64,
    position: { latitude: -33.83, longitude: 151.26 }
  },
  {
    identifiant: "123456789006",
    nom: "Leroy",
    prenom: "Hugo",
    etat: "actif",
    service: "maintenance",
    frequence_cardiaque: 82,
    position: { latitude: -33.78, longitude: 151.28 }
  },
  {
    identifiant: "123456789007",
    nom: "Fournier",
    prenom: "Lena",
    etat: "repos",
    service: "commercial",
    frequence_cardiaque: 72,
    position: { latitude: -33.88, longitude: 151.23 }
  },
  {
    identifiant: "123456789008",
    nom: "Girard",
    prenom: "Nathan",
    etat: "actif",
    service: "direction générale",
    frequence_cardiaque: 65,
    position: { latitude: -33.87, longitude: 151.19 }
  },
  {
    identifiant: "123456789009",
    nom: "Lambert",
    prenom: "Sarah",
    etat: "actif",
    service: "informatique",
    frequence_cardiaque: 77,
    position: { latitude: -33.86, longitude: 151.22 }
  },
  {
    identifiant: "123456789010",
    nom: "Bonnet",
    prenom: "Leo",
    etat: "congé",
    service: "cyber sécurité",
    frequence_cardiaque: 62,
    position: { latitude: -33.81, longitude: 151.29 }
  },
  {
    identifiant: "123456789011",
    nom: "Francois",
    prenom: "Eva",
    etat: "actif",
    service: "industriel",
    frequence_cardiaque: 80,
    position: { latitude: -33.88, longitude: 151.33 }
  },
  {
    identifiant: "123456789012",
    nom: "Barbier",
    prenom: "Jules",
    etat: "repos",
    service: "marketing",
    frequence_cardiaque: 71,
    position: { latitude: -33.92, longitude: 151.30 }
  },
  {
    identifiant: "123456789013",
    nom: "Roussel",
    prenom: "Mila",
    etat: "actif",
    service: "analyse des données",
    frequence_cardiaque: 78,
    position: { latitude: -33.77, longitude: 151.27 }
  },
  {
    identifiant: "123456789014",
    nom: "Gauthier",
    prenom: "Adam",
    etat: "actif",
    service: "qualité",
    frequence_cardiaque: 74,
    position: { latitude: -33.83, longitude: 151.24 }
  },
  {
    identifiant: "123456789015",
    nom: "Lopez",
    prenom: "Camille",
    etat: "actif",
    service: "commercial",
    frequence_cardiaque: 66,
    position: { latitude: -33.87, longitude: 151.31 }
  }
];


// ------------------- OPERATIONS (8) -------------------
const operations = [
  {
    identifiant: 1,
    type: "Achat",
    responsable: "123456789001",
    marge: 2500,
    kilometres: 360,
    mot_responsable: "deal",
    mot_client: "prix"
  },
  {
    identifiant: 2,
    type: "Vente",
    responsable: "123456789007",
    marge: 4300,
    kilometres: 540,
    mot_responsable: "urgent",
    mot_client: "qualité"
  },
  {
    identifiant: 3,
    type: "Vente",
    responsable: "123456789015",
    marge: 1200,
    kilometres: 120,
    mot_responsable: "contact",
    mot_client: "livraison"
  },
  {
    identifiant: 4,
    type: "Achat",
    responsable: "123456789008",
    marge: 9500,
    kilometres: 890,
    mot_responsable: "budget",
    mot_client: "accord"
  },
  {
    identifiant: 5,
    type: "Vente",
    responsable: "123456789001",
    marge: 3100,
    kilometres: 200,
    mot_responsable: "client",
    mot_client: "prix"
  },
  {
    identifiant: 6,
    type: "Achat",
    responsable: "123456789007",
    marge: 450,
    kilometres: 70,
    mot_responsable: "stock",
    mot_client: "commande"
  },
  {
    identifiant: 7,
    type: "Achat",
    responsable: "123456789003",
    marge: 520,
    kilometres: 42,
    mot_responsable: "fournisseur",
    mot_client: "urgent"
  },
  {
    identifiant: 8,
    type: "Vente",
    responsable: "123456789015",
    marge: 800,
    kilometres: 160,
    mot_responsable: "vente",
    mot_client: "quantité"
  }
];


// ------------------- ARTICLES (10) -------------------
const articles = [...Array(10)].map((_, i) => ({
  identifiant_produit: i + 1,
  zone: 100 + i,
  etat_emballage: Math.random() > 0.5 ? "Correct" : "Déformé",
  responsable: personnels[Math.floor(Math.random() * 15)].identifiant,
  position: { x: Math.random() * 10, y: Math.random() * 10, z: Math.random() * 10 },
  rotation: { roll: Math.random()*180, pitch: Math.random()*180, yaw: Math.random()*180 },
  collisions: Math.floor(Math.random() * 5)
}));


// ------------------- MACHINES (5) -------------------
const machines = [...Array(5)].map((_, i) => ({
  reference: 500 + i,
  zone: 100 + i,
  premiere_mise_service: new Date(2020, 5, 10 + i),
  cadence: Math.round(Math.random() * 100 + 50),
  etat: ["active", "arrêt", "panne", "entretien", "réparation"][Math.floor(Math.random()*5)],
  prochain_entretien: new Date(2025, 1, 10 + i),
  utilisateur_actuel: personnels[Math.floor(Math.random() * 15)].identifiant
}));


// ------------------- SURVEILLANCE (5) -------------------
const surveillances = [...Array(5)].map((_, i) => ({
  zone: 200 + i,
  drones_actifs: Math.floor(Math.random()*10),
  drones_panne: Math.floor(Math.random()*5),
  drones_recharge: Math.floor(Math.random()*5),
  detection_incendie: Math.random() > 0.8,
  detection_forme: ["aucune", "personnel non identifiée", "objet non identifié"][Math.floor(Math.random()*3)],
  audit_conformite: Math.random() > 0.4
}));


// ------------------- INSERT DATA -------------------
async function seed() {
  try {
    await Personnel.deleteMany();
    await Operation.deleteMany();
    await Article.deleteMany();
    await Machine.deleteMany();
    await Surveillance.deleteMany();

    await Personnel.insertMany(personnels);
    await Operation.insertMany(operations);
    await Article.insertMany(articles);
    await Machine.insertMany(machines);
    await Surveillance.insertMany(surveillances);

    console.log("✅ Seed completed successfully !");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
