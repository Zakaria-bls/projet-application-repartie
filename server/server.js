// ----------- IMPORTS -----------
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// ----------- APP SETUP -----------
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// ----------- MONGODB CONNECTION -----------
const MONGO_URI =
  "mongodb+srv://zakariaboulsane_db_user:2ndmeirJFyqtMuCD@cluster0.klmmhcc.mongodb.net/innov3d?retryWrites=true&w=majority&appName=Cluster0";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Cannot connect to MongoDB:", err.message);
    process.exit(1);
  }
}
connectDB();

// ----------- LOAD MODELS AUTOMATICALLY -----------
// Cela charge tous les fichiers du dossier models/
const modelsPath = path.join(__dirname, "models");

fs.readdirSync(modelsPath).forEach(file => {
  if (file.endsWith(".js")) {
    require(path.join(modelsPath, file));
    console.log(`📦 Model loaded: ${file}`);
  }
});

// ----------- LOAD ROUTES -----------
app.use("/api/personnel", require("./routes/personnelRoutes"));
app.use("/api/operations", require("./routes/operationRoutes"));
app.use("/api/articles", require("./routes/articleRoutes"));
app.use("/api/machines", require("./routes/machineRoutes"));
app.use("/api/surveillance", require("./routes/surveillanceRoutes"));

// ----------- START SERVER -----------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
