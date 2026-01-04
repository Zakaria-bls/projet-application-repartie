# Projet Applications Réparties — Innov3D Dashboard

Dashboard web (front + back) permettant de visualiser des indicateurs “industrie / logistique” à partir d’une base MongoDB (personnel, opérations, machines, articles, surveillance), avec quelques KPI + graphiques.

> Dossier principal : `projet-application-repartie/`  
> (Le dossier `Projet-Apps-Rep-TP1/` est un TP séparé du projet final.)

---

## Stack technique

### Frontend
- React (Vite)
- React Router
- Axios
- Recharts (graphiques)

### Backend
- Node.js + Express
- MongoDB via Mongoose
- CORS activé

### Services externes (optionnels)
Le Dashboard tente aussi d’appeler 2 APIs externes :
- `http://10.206.29.157:5003/api/total_sales`
- `http://10.206.29.157:5004/api/best_cybersec_training`

Si elles sont inaccessibles (réseau/campus), l’app ne plante pas : elle affiche des valeurs par défaut (0 / null).

---

## Architecture

