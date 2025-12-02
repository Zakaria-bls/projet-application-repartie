import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line
} from "recharts";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [endpointsData, setEndpointsData] = useState({
    articles: 0,
    correctCount: 0,
    deformeCount: 0,
    leastCollisions: null,
    topResponsable: null,
    totalVentes: 0,
    incendiesCount: 0
  });

  // Fonctions pour récupérer chaque endpoint
  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/articles");
      return res.data.length || 0;
    } catch (err) {
      console.error("Erreur articles:", err);
      return 0;
    }
  };

  const fetchCorrectCount = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/articles/correct-count");
      return res.data.total_correct || 0;
    } catch (err) {
      console.error("Erreur correct-count:", err);
      return 0;
    }
  };

  const fetchDeformeCount = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/articles/deforme-count");
      return res.data.total_deforme || 0;
    } catch (err) {
      console.error("Erreur deforme-count:", err);
      return 0;
    }
  };

  const fetchLeastCollisions = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/articles/least-collisions");
      return res.data;
    } catch (err) {
      console.error("Erreur least-collisions:", err);
      return null;
    }
  };

  const fetchTopResponsable = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/operations/top-responsable-km-with-name");
      return res.data;
    } catch (err) {
      console.error("Erreur top-responsable:", err);
      return null;
    }
  };

  const fetchTotalVentes = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/operations/total-ventes");
      return res.data.totalVentes || 0;
    } catch (err) {
      console.error("Erreur total-ventes:", err);
      return 0;
    }
  };

  const fetchIncendiesCount = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/surveillances/incendies-count");
      return res.data.total_incendies || 0;
    } catch (err) {
      console.error("Erreur incendies-count:", err);
      return 0;
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        const [
          articlesCount,
          correctCount,
          deformeCount,
          leastCollisions,
          topResponsable,
          totalVentes,
          incendiesCount
        ] = await Promise.all([
          fetchArticles(),
          fetchCorrectCount(),
          fetchDeformeCount(),
          fetchLeastCollisions(),
          fetchTopResponsable(),
          fetchTotalVentes(),
          fetchIncendiesCount()
        ]);

        setEndpointsData({
          articles: articlesCount,
          correctCount,
          deformeCount,
          leastCollisions,
          topResponsable,
          totalVentes,
          incendiesCount
        });
      } catch (error) {
        console.error("Erreur générale:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  // Données pour le graphique d'emballage
  const emballageData = [
    { name: 'Correct', value: endpointsData.correctCount, color: '#4CAF50' },
    { name: 'Déformé', value: endpointsData.deformeCount, color: '#FF9800' },
  ];

  // Données pour le graphique à barres des ventes (simulation mensuelle)
  const ventesData = [
    { mois: 'Jan', ventes: endpointsData.totalVentes * 0.1 },
    { mois: 'Fév', ventes: endpointsData.totalVentes * 0.15 },
    { mois: 'Mar', ventes: endpointsData.totalVentes * 0.12 },
    { mois: 'Avr', ventes: endpointsData.totalVentes * 0.18 },
    { mois: 'Mai', ventes: endpointsData.totalVentes * 0.25 },
    { mois: 'Jun', ventes: endpointsData.totalVentes * 0.2 },
  ];

  // Données pour les incidents
  const incidentsData = [
    { type: 'Incendies', count: endpointsData.incendiesCount, color: '#F44336' },
    { type: 'Collisions', count: endpointsData.leastCollisions?.collisions || 0, color: '#FFC107' },
  ];

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="header">
          <h1>Dashboard Innov3D</h1>
          <p className="subtitle">Vue d'ensemble des données système en temps réel</p>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Chargement des données...</p>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon">📦</div>
                <div className="kpi-content">
                  <h3>Total Articles</h3>
                  <p className="kpi-value">{endpointsData.articles}</p>
                  <p className="kpi-label">Articles enregistrés</p>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon">💰</div>
                <div className="kpi-content">
                  <h3>Total Ventes</h3>
                  <p className="kpi-value">{endpointsData.totalVentes.toLocaleString()} €</p>
                  <p className="kpi-label">Montant total</p>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon">🚨</div>
                <div className="kpi-content">
                  <h3>Incendies</h3>
                  <p className="kpi-value">{endpointsData.incendiesCount}</p>
                  <p className="kpi-label">Zones à risque</p>
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon">👑</div>
                <div className="kpi-content">
                  <h3>Top Responsable</h3>
                  <p className="kpi-value">{endpointsData.topResponsable?.totalKilometres || 0} km</p>
                  <p className="kpi-label">
                    {endpointsData.topResponsable ? 
                      `${endpointsData.topResponsable.prenom} ${endpointsData.topResponsable.nom}` : 
                      'Non disponible'}
                  </p>
                </div>
              </div>
            </div>

            {/* Graphiques */}
            <div className="charts-grid">
              {/* Graphique d'emballage */}
              <div className="chart-card">
                <h3>📊 État des Emballages</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={emballageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {emballageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-stats">
                  <div className="stat-item">
                    <span className="stat-dot" style={{ backgroundColor: '#4CAF50' }}></span>
                    <span>Correct: {endpointsData.correctCount}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-dot" style={{ backgroundColor: '#FF9800' }}></span>
                    <span>Déformé: {endpointsData.deformeCount}</span>
                  </div>
                </div>
              </div>

              {/* Graphique des ventes */}
              <div className="chart-card">
                <h3>💰 Évolution des Ventes</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={ventesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value.toFixed(0)} €`, 'Ventes']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="ventes" 
                        stroke="#2196F3" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-stats">
                  <div className="stat-item">
                    <span>Total: {endpointsData.totalVentes.toLocaleString()} €</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deuxième ligne de graphiques */}
            <div className="charts-grid">
              {/* Graphique des incidents */}
              <div className="chart-card">
                <h3>🚨 Incidents & Sécurité</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={incidentsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]}>
                        {incidentsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-stats">
                  <div className="stat-item">
                    <span className="stat-dot" style={{ backgroundColor: '#F44336' }}></span>
                    <span>Incendies: {endpointsData.incendiesCount}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-dot" style={{ backgroundColor: '#FFC107' }}></span>
                    <span>Collisions: {endpointsData.leastCollisions?.collisions || 0}</span>
                  </div>
                </div>
              </div>

              {/* Tableau de bord des responsabilités */}
              <div className="chart-card">
                <h3>👥 Top Responsable</h3>
                <div className="responsable-card">
                  {endpointsData.topResponsable ? (
                    <>
                      <div className="responsable-avatar">
                        {endpointsData.topResponsable.prenom.charAt(0)}
                        {endpointsData.topResponsable.nom.charAt(0)}
                      </div>
                      <div className="responsable-info">
                        <h4>{endpointsData.topResponsable.prenom} {endpointsData.topResponsable.nom}</h4>
                        <p className="responsable-id">ID: {endpointsData.topResponsable.identifiant}</p>
                        <div className="km-badge">
                          <span className="km-value">{endpointsData.topResponsable.totalKilometres}</span>
                          <span className="km-label">kilomètres</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="no-data">Aucun responsable disponible</p>
                  )}
                </div>
                <div className="performance-indicator">
                  <h4>Performance</h4>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${Math.min((endpointsData.topResponsable?.totalKilometres || 0) / 1000 * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="progress-labels">
                    <span>0 km</span>
                    <span>1000 km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Détails des endpoints */}
            <div className="section">
              <h2>🔗 Endpoints API Actifs</h2>
              <div className="endpoints-grid">
                {[
                  { url: "http://localhost:3001/api/articles", method: "GET", count: endpointsData.articles, label: "articles" },
                  { url: "http://localhost:3001/api/articles/correct-count", method: "GET", count: endpointsData.correctCount, label: "corrects" },
                  { url: "http://localhost:3001/api/articles/deforme-count", method: "GET", count: endpointsData.deformeCount, label: "déformés" },
                  { url: "http://localhost:3001/api/articles/least-collisions", method: "GET", available: !!endpointsData.leastCollisions },
                  { url: "http://localhost:3001/api/operations/top-responsable-km-with-name", method: "GET", available: !!endpointsData.topResponsable },
                  { url: "http://localhost:3001/api/operations/total-ventes", method: "GET", count: endpointsData.totalVentes, label: "€" },
                  { url: "http://localhost:3001/api/surveillances/incendies-count", method: "GET", count: endpointsData.incendiesCount, label: "incendies" },
                ].map((endpoint, index) => (
                  <div key={index} className="endpoint-card">
                    <div className="endpoint-header">
                      <span className={`method-badge ${endpoint.method.toLowerCase()}`}>
                        {endpoint.method}
                      </span>
                      <span className={`status-badge ${endpoint.available !== undefined ? (endpoint.available ? 'success' : 'error') : 'success'}`}>
                        {endpoint.available !== undefined ? (endpoint.available ? '✓' : '✗') : '✓'}
                      </span>
                    </div>
                    <code className="endpoint-url">{endpoint.url}</code>
                    {endpoint.count !== undefined && (
                      <div className="endpoint-metric">
                        <span className="metric-value">{endpoint.count.toLocaleString()}</span>
                        <span className="metric-label">{endpoint.label}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .header {
          margin-bottom: 40px;
        }

        .header h1 {
          margin: 0 0 10px 0;
          color: #1a237e;
          font-size: 32px;
        }

        .subtitle {
          color: #666;
          font-size: 16px;
          margin: 0;
        }

        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 60vh;
          color: #666;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #1a237e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .kpi-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #e0e0e0;
        }

        .kpi-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
        }

        .kpi-icon {
          font-size: 40px;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          color: white;
        }

        .kpi-content {
          flex: 1;
        }

        .kpi-content h3 {
          margin: 0 0 10px 0;
          color: #555;
          font-size: 18px;
          font-weight: 600;
        }

        .kpi-value {
          font-size: 32px;
          font-weight: bold;
          margin: 5px 0;
          color: #1a237e;
        }

        .kpi-label {
          color: #777;
          font-size: 14px;
          margin: 0;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 30px;
          margin-bottom: 30px;
        }

        @media (max-width: 968px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }

        .chart-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e0e0e0;
        }

        .chart-card h3 {
          margin: 0 0 20px 0;
          color: #333;
          font-size: 18px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .chart-container {
          height: 250px;
          margin-bottom: 20px;
        }

        .chart-stats {
          display: flex;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #555;
        }

        .stat-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .responsable-card {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .responsable-avatar {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
        }

        .responsable-info h4 {
          margin: 0 0 5px 0;
          color: #333;
        }

        .responsable-id {
          color: #777;
          font-size: 14px;
          margin: 0 0 10px 0;
        }

        .km-badge {
          background: #e3f2fd;
          border-radius: 20px;
          padding: 8px 16px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
        }

        .km-value {
          font-size: 20px;
          font-weight: bold;
          color: #2196F3;
        }

        .km-label {
          font-size: 12px;
          color: #666;
        }

        .performance-indicator {
          margin-top: 20px;
        }

        .performance-indicator h4 {
          margin: 0 0 10px 0;
          color: #555;
        }

        .progress-bar {
          height: 8px;
          background: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 5px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4CAF50, #8BC34A);
          transition: width 0.5s ease;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #777;
        }

        .no-data {
          text-align: center;
          color: #999;
          padding: 40px 0;
        }

        .section {
          margin-top: 40px;
        }

        .section h2 {
          margin-bottom: 20px;
          color: #333;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
        }

        .endpoints-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
        }

        .endpoint-card {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          border-left: 4px solid #4CAF50;
          transition: transform 0.2s;
        }

        .endpoint-card:hover {
          transform: translateY(-2px);
          background: #e9ecef;
        }

        .endpoint-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .method-badge {
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          color: white;
        }

        .method-badge.get {
          background: #4CAF50;
        }

        .status-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }

        .status-badge.success {
          background: #4CAF50;
          color: white;
        }

        .status-badge.error {
          background: #F44336;
          color: white;
        }

        .endpoint-url {
          display: block;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          color: #333;
          margin-bottom: 15px;
          word-break: break-all;
        }

        .endpoint-metric {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .metric-value {
          font-size: 24px;
          font-weight: bold;
          color: #1a237e;
        }

        .metric-label {
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}