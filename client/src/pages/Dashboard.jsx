import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
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
    incendiesCount: 0,
    // Add these new fields for the Group 8 API
    totalSalesAmount: 0,
    totalSalesCurrency: 'EUR',
    salesCount: 0,
    operationsAnalyzed: 0,
    salesDescription: '',
    salesIndicator: '',
    // New fields for cybersecurity training API
    cybersecTraining: null,
    totalCybersecTrainings: 0,
    totalTrainingsAnalyzed: 0,
    cybersecDescription: '',
    cybersecIndicator: ''
  });

  const fetchMontantTotalVentes = async () => {
    try {
      const response = await fetch("http://10.206.29.157:5003/api/total_sales");

      if (!response.ok) {
        throw new Error("Erreur API");
      }

      const data = await response.json();
      console.log("Résultat API Groupe 8 (Ventes) :", data);

      // Return the data in a consistent format
      return {
        totalSalesAmount: data.total_sales_amount || 0,
        totalSalesCurrency: data.currency || 'EUR',
        salesCount: data.sales_count || 0,
        operationsAnalyzed: data.total_operations_analyzed || 0,
        salesDescription: data.description || '',
        salesIndicator: data.indicator || ''
      };

    } catch (error) {
      console.error("Erreur fetch Montant Total Ventes :", error);
      // Return default values in case of error
      return {
        totalSalesAmount: 0,
        totalSalesCurrency: 'EUR',
        salesCount: 0,
        operationsAnalyzed: 0,
        salesDescription: '',
        salesIndicator: ''
      };
    }
  };

  const fetchBestCybersecTraining = async () => {
    try {
      const response = await fetch("http://10.206.29.157:5004/api/best_cybersec_training");

      if (!response.ok) {
        throw new Error("Erreur API Cybersécurité");
      }

      const data = await response.json();
      console.log("Résultat API Groupe 8 (Cybersécurité) :", data);

      // Return the data in a consistent format
      return {
        cybersecTraining: data.training || null,
        totalCybersecTrainings: data.total_cybersec_trainings || 0,
        totalTrainingsAnalyzed: data.total_trainings_analyzed || 0,
        cybersecDescription: data.description || '',
        cybersecIndicator: data.indicator || ''
      };

    } catch (error) {
      console.error("Erreur fetch Formation Cybersécurité :", error);
      // Return default values in case of error
      return {
        cybersecTraining: null,
        totalCybersecTrainings: 0,
        totalTrainingsAnalyzed: 0,
        cybersecDescription: '',
        cybersecIndicator: ''
      };
    }
  };

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
          incendiesCount,
          group8SalesData,
          group8CybersecData  // Add this
        ] = await Promise.all([
          fetchArticles(),
          fetchCorrectCount(),
          fetchDeformeCount(),
          fetchLeastCollisions(),
          fetchTopResponsable(),
          fetchTotalVentes(),
          fetchIncendiesCount(),
          fetchMontantTotalVentes(),
          fetchBestCybersecTraining()  // Add this
        ]);

        setEndpointsData({
          articles: articlesCount,
          correctCount,
          deformeCount,
          leastCollisions,
          topResponsable,
          totalVentes,
          incendiesCount,
          // Add the Group 8 data
          totalSalesAmount: group8SalesData.totalSalesAmount,
          totalSalesCurrency: group8SalesData.totalSalesCurrency,
          salesCount: group8SalesData.salesCount,
          operationsAnalyzed: group8SalesData.operationsAnalyzed,
          salesDescription: group8SalesData.salesDescription,
          salesIndicator: group8SalesData.salesIndicator,
          // Add the Group 8 cybersecurity data
          cybersecTraining: group8CybersecData.cybersecTraining,
          totalCybersecTrainings: group8CybersecData.totalCybersecTrainings,
          totalTrainingsAnalyzed: group8CybersecData.totalTrainingsAnalyzed,
          cybersecDescription: group8CybersecData.cybersecDescription,
          cybersecIndicator: group8CybersecData.cybersecIndicator
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

  // Données pour le radar chart de formation cybersécurité
  const cybersecTrainingData = endpointsData.cybersecTraining ? [
    { subject: 'Satisfaction', A: endpointsData.cybersecTraining.pct_satisfaction || 0, fullMark: 100 },
    { subject: 'Engagement', A: endpointsData.cybersecTraining.pct_engagement || 0, fullMark: 100 },
  ] : [];

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
              {/* Ventes Groupe 8 */}
              <div className="kpi-card">
                <div className="kpi-icon">🏪</div>
                <div className="kpi-content">
                  <h3>Ventes Groupe 8</h3>
                  <p className="kpi-value">
                    {endpointsData.totalSalesAmount.toLocaleString()} {endpointsData.totalSalesCurrency}
                  </p>
                  <p className="kpi-label">
                    {endpointsData.salesCount} ventes / {endpointsData.operationsAnalyzed} opérations
                  </p>
                  {endpointsData.salesIndicator && (
                    <small style={{ color: endpointsData.salesIndicator === 'A' ? '#4CAF50' : '#FF9800' }}>
                      Indicateur: {endpointsData.salesIndicator}
                    </small>
                  )}
                </div>
              </div>

              {/* Formation Cybersécurité */}
              <div className="kpi-card">
                <div className="kpi-icon">🔒</div>
                <div className="kpi-content">
                  <h3>Meilleure Formation Cyber</h3>
                  <p className="kpi-value">
                    {endpointsData.cybersecTraining?.pct_satisfaction || 0}%
                  </p>
                  <p className="kpi-label">
                    {endpointsData.totalCybersecTrainings} formations / {endpointsData.totalTrainingsAnalyzed} analysées
                  </p>
                  {endpointsData.cybersecIndicator && (
                    <small style={{ color: endpointsData.cybersecIndicator === 'A' ? '#4CAF50' : '#FF9800' }}>
                      Indicateur: {endpointsData.cybersecIndicator}
                    </small>
                  )}
                </div>
              </div>

              {/* Total Articles */}
              <div className="kpi-card">
                <div className="kpi-icon">📦</div>
                <div className="kpi-content">
                  <h3>Total Articles</h3>
                  <p className="kpi-value">{endpointsData.articles}</p>
                  <p className="kpi-label">Articles enregistrés</p>
                </div>
              </div>

              {/* Incendies */}
              <div className="kpi-card">
                <div className="kpi-icon">🚨</div>
                <div className="kpi-content">
                  <h3>Incendies</h3>
                  <p className="kpi-value">{endpointsData.incendiesCount}</p>
                  <p className="kpi-label">Zones à risque</p>
                </div>
              </div>

              {/* Top Responsable */}
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

              {/* Total Ventes Locales */}
              <div className="kpi-card">
                <div className="kpi-icon">💰</div>
                <div className="kpi-content">
                  <h3>Total Ventes Locales</h3>
                  <p className="kpi-value">{endpointsData.totalVentes.toLocaleString()} €</p>
                  <p className="kpi-label">Montant total des ventes</p>
                </div>
              </div>
            </div>

            {/* Graphiques - Première ligne */}
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

            {/* Graphiques - Deuxième ligne */}
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

              {/* Graphique Radar Cybersécurité */}
              <div className="chart-card">
                <h3>🔒 Formation Cybersécurité</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={250}>
                    {endpointsData.cybersecTraining ? (
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={cybersecTrainingData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Pourcentage"
                          dataKey="A"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                        <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                        <Legend />
                      </RadarChart>
                    ) : (
                      <div className="no-chart-data">
                        <p>Aucune donnée de formation disponible</p>
                      </div>
                    )}
                  </ResponsiveContainer>
                </div>
                <div className="chart-stats">
                  {endpointsData.cybersecTraining ? (
                    <>
                      <div className="stat-item">
                        <span>Satisfaction: {endpointsData.cybersecTraining.pct_satisfaction}%</span>
                      </div>
                      <div className="stat-item">
                        <span>Engagement: {endpointsData.cybersecTraining.pct_engagement}%</span>
                      </div>
                    </>
                  ) : (
                    <div className="stat-item">
                      <span>Aucune donnée disponible</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Graphiques - Troisième ligne */}
            <div className="charts-grid">
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

              {/* Détails Formation Cybersécurité */}
              <div className="chart-card">
                <h3>📚 Détails Formation</h3>
                {endpointsData.cybersecTraining ? (
                  <div className="training-details">
                    <div className="training-header">
                      <h4>{endpointsData.cybersecTraining.nom_formation}</h4>
                      <span className="training-badge" style={{ 
                        backgroundColor: endpointsData.cybersecTraining.pct_satisfaction > 90 ? '#4CAF50' : 
                                       endpointsData.cybersecTraining.pct_satisfaction > 70 ? '#FF9800' : '#F44336' 
                      }}>
                        {endpointsData.cybersecTraining.pct_satisfaction}%
                      </span>
                    </div>
                    <div className="training-info">
                      <div className="info-row">
                        <span className="info-label">Date:</span>
                        <span className="info-value">
                          {new Date(endpointsData.cybersecTraining.date_formation).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Sujet:</span>
                        <span className="info-value">{endpointsData.cybersecTraining.sujet}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Mot clé Formateur:</span>
                        <span className="info-value">{endpointsData.cybersecTraining.mot_formateur}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Mot clé Personnel:</span>
                        <span className="info-value">{endpointsData.cybersecTraining.mot_personnel}</span>
                      </div>
                    </div>
                    <div className="training-stats">
                      <div className="stat-circle">
                        <div className="circle-value">{endpointsData.cybersecTraining.pct_satisfaction}%</div>
                        <div className="circle-label">Satisfaction</div>
                      </div>
                      <div className="stat-circle">
                        <div className="circle-value">{endpointsData.cybersecTraining.pct_engagement}%</div>
                        <div className="circle-label">Engagement</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="no-training-data">
                    <p>Aucune information de formation disponible</p>
                  </div>
                )}
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
                  // API Groupe 8 - Ventes
                  {
                    url: "http://10.206.29.157:5003/api/total_sales",
                    method: "GET",
                    count: endpointsData.totalSalesAmount,
                    label: endpointsData.totalSalesCurrency,
                    description: "API Groupe 8 (Ventes)"
                  },
                  // API Groupe 8 - Cybersécurité
                  {
                    url: "http://10.206.29.157:5004/api/best_cybersec_training",
                    method: "GET",
                    count: endpointsData.totalCybersecTrainings,
                    label: "formations",
                    description: "API Groupe 8 (Cybersécurité)",
                    available: !!endpointsData.cybersecTraining
                  },
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
                    {endpoint.description && (
                      <div className="endpoint-description">
                        {endpoint.description}
                      </div>
                    )}
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

        .no-chart-data {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #999;
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

        .no-data, .no-training-data {
          text-align: center;
          color: #999;
          padding: 40px 0;
        }

        .training-details {
          margin-top: 10px;
        }

        .training-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .training-header h4 {
          margin: 0;
          color: #333;
          font-size: 16px;
          flex: 1;
        }

        .training-badge {
          padding: 4px 12px;
          border-radius: 20px;
          color: white;
          font-weight: bold;
          font-size: 14px;
        }

        .training-info {
          margin-bottom: 20px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #eee;
        }

        .info-label {
          font-weight: 600;
          color: #666;
        }

        .info-value {
          color: #333;
        }

        .training-stats {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
        }

        .stat-circle {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .circle-value {
          font-size: 24px;
          font-weight: bold;
          color: #1a237e;
          margin-bottom: 5px;
        }

        .circle-label {
          font-size: 12px;
          color: #666;
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

        .endpoint-description {
          font-size: 12px;
          color: #666;
          margin-bottom: 5px;
          font-weight: 500;
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