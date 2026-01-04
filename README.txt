================================================================================
                          INNOV3D - DASHBOARD DE GESTION
================================================================================

📋 APERÇU DU PROJET
================================================================================
Innov3D est une application web full-stack pour la gestion intelligente d'une 
entreprise d'impression 3D industrielle. Le système offre un monitoring en 
temps réel de la production, de la qualité, des opérations logistiques et 
de la sécurité.

🎯 FONCTIONNALITÉS PRINCIPALES
================================================================================
• 📊 Tableau de bord interactif avec indicateurs KPI
• ✅ Monitoring de la qualité des articles
• 🔧 Gestion de maintenance et sécurité
• 🔄 Intégration d'APIs externes (Groupe 8)
• 📈 Visualisations de données en temps réel

🛠️ STACK TECHNOLOGIQUE
================================================================================

FRONTEND:
• React.js 18
• Axios pour les requêtes HTTP
• Recharts pour les graphiques
• CSS Modules pour le styling

BACKEND:
• Node.js avec Express.js
• MongoDB Atlas (base de données cloud)
• Mongoose ODM
• CORS & Helmet pour la sécurité

📁 STRUCTURE DU PROJET
================================================================================
projet-application-repartie/
├── client/                    # Application React
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/           # Pages principales
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Qualite.jsx
│   │   │   └── Maintenance.jsx
│   │   ├── services/        # Services API
│   │   └── styles/          # Fichiers CSS
│   └── package.json
│
├── server/                   # API Node.js
│   ├── models/              # Modèles Mongoose
│   │   ├── Article.js
│   │   ├── Operation.js
│   │   └── Surveillance.js
│   ├── routes/              # Routes API
│   │   ├── articles.js
│   │   ├── operations.js
│   │   └── surveillances.js
│   ├── middleware/          # Middleware personnalisé
│   ├── server.js           # Point d'entrée
│   └── package.json
│
└── README.txt              # Ce fichier

🚀 INSTALLATION ET CONFIGURATION
================================================================================

PRÉREQUIS:
• Node.js (v14 ou supérieur)
• npm ou yarn
• Compte MongoDB Atlas

ÉTAPE 1 : CLONER LE DÉPÔT
git clone https://github.com/Zakaria-bls/projet-application-repartie.git
cd projet-application-repartie

ÉTAPE 2 : INSTALLER LES DÉPENDANCES BACKEND
cd server
npm install

ÉTAPE 3 : CONFIGURER LES VARIABLES D'ENVIRONNEMENT
Créer un fichier .env dans le dossier server :

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/innov3d
PORT=3001
CORS_ORIGIN=http://localhost:3000

ÉTAPE 4 : INSTALLER LES DÉPENDANCES FRONTEND
cd ../client
npm install

ÉTAPE 5 : LANCER L'APPLICATION

OPTION A : LANCER SÉPARÉMENT
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start

OPTION B : LANCER AVEC SCRIPT CONCURRENT
# À partir du dossier racine
npm run dev:full

ACCÈS À L'APPLICATION:
• Frontend : http://localhost:3000
• Backend API : http://localhost:3001

🔌 POINTS D'ACCÈS API
================================================================================

📦 ENDPOINTS ARTICLES:
GET    /api/articles                    # Récupère tous les articles
GET    /api/articles/correct-count      # Compte les articles correctement emballés
GET    /api/articles/deformed-count     # Compte les articles déformés
GET    /api/articles/current-counts     # Obtenir les compteurs actuels

🚚 ENDPOINTS OPÉRATIONS:
GET    /api/operations/top-responsable-km-with-name  # Meilleur responsable par km
GET    /api/operations/total-sales                   # Montant total des ventes
GET    /api/operations/actual-vmware                 # Opérations VMware

🛡️ ENDPOINTS SURVEILLANCE:
GET    /api/surveillances               # Tous les incidents de sécurité
GET    /api/surveillances/active        # Incidents actifs

🔗 APIS EXTERNES (GROUPE 8):
GET    http://10.206.29.157:5003/api/total_sales         # Données ventes externes
GET    http://10.206.29.157:5004/api/best_cybersec_training # Données cybersécurité

📊 MODÈLES DE DONNÉES
================================================================================

ARTICLE:
{
    _id: ObjectId,
    nom: String,
    etat_emballage: ['Correct', 'Déformé'],
    collisions: Number,
    date_production: Date,
    localisation: String
}

OPÉRATION:
{
    type: ['Vente', 'Transport', 'Stockage'],
    responsable: String,  // SSN du personnel
    kilometres: Number,
    marge: Number,
    date_operation: Date
}

📸 CAPTURES D'ÉCRAN
================================================================================
L'application comprend plusieurs interfaces :
1. Tableau de bord principal - Vue d'ensemble des KPI
2. Monitoring qualité - Suivi des articles corrects/déformés
3. Interface maintenance - Gestion des incidents
4. Intégration externe - Données du Groupe 8

👥 ÉQUIPE DE DÉVELOPPEMENT
================================================================================
• Mohamed Reda MAMOUNE
• Zakaria BOULSANE

Cours : Applications Réparties (M2 ISC - TNI)
Année : 2025

🔗 LIENS UTILES
================================================================================
• Dépôt GitHub : https://github.com/Zakaria-bls/projet-application-repartie
• Documentation API : Disponible dans /server/routes/
• Modèles de données : Disponible dans /server/models/

🐛 DÉPANNAGE
================================================================================

PROBLÈMES COURANTS:

1. Erreur de connexion MongoDB
   - Vérifier l'URI dans le fichier .env
   - Vérifier les autorisations IP dans MongoDB Atlas

2. Erreur CORS
   - Vérifier que CORS_ORIGIN correspond à l'URL du frontend
   - Redémarrer le serveur après modification du .env

3. APIs externes indisponibles
   - Vérifier la connectivité réseau
   - Les APIs du Groupe 8 doivent être actives

SCRIPTS DISPONIBLES:
# Développement
npm run dev           # Backend seul
npm run client        # Frontend seul
npm run dev:full      # Les deux simultanément

# Production
npm run build         # Build frontend
npm start             # Démarrage production

📄 LICENCE
================================================================================
Ce projet a été développé à des fins académiques dans le cadre du cours 
d'Applications Réparties (M2 ISC - TNI).

================================================================================
                     POUR TOUTE QUESTION OU SUPPORT TECHNIQUE,
                     VEUILLEZ CONTACTER L'ÉQUIPE DE DÉVELOPPEMENT.
================================================================================