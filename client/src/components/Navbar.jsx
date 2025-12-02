import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "/";
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    // { path: "/qualite", label: "Qualité", icon: "✅" },
    // { path: "/maintenance", label: "Maintenance", icon: "🔧" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo et nom */}
          <div className="navbar-brand">
            <div className="logo-container">
              <span className="logo-icon">⚡</span>
              <h1 className="logo-text">Innov3D</h1>
            </div>
            <p className="tagline">Système de Gestion Intelligente</p>
          </div>

          {/* Menu Desktop */}
          <div className="navbar-menu">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path)}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            <button
              onClick={logout}
              className="logout-btn"
            >
              <span className="logout-icon">🚪</span>
              Déconnexion
            </button>
          </div>

          {/* Bouton Menu Mobile */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${isActive(item.path)}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            <button
              onClick={logout}
              className="mobile-logout-btn"
            >
              <span className="logout-icon">🚪</span>
              Déconnexion
            </button>
          </div>
        )}
      </nav>

      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
          color: white;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        .navbar-brand {
          display: flex;
          flex-direction: column;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          font-size: 28px;
        }

        .logo-text {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(90deg, #64b5f6, #bb86fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tagline {
          margin: 0;
          font-size: 12px;
          color: #bbdefb;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .nav-link {
          color: #e3f2fd;
          text-decoration: none;
          font-weight: 500;
          padding: 10px 15px;
          border-radius: 8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateY(-2px);
        }

        .nav-link.active {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .nav-icon {
          font-size: 18px;
        }

        .logout-btn {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 10px;
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        .logout-icon {
          font-size: 16px;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 10px;
          border-radius: 6px;
          transition: background-color 0.3s;
        }

        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-menu {
          display: none;
          background: #283593;
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          flex-direction: column;
          gap: 15px;
        }

        .mobile-nav-link {
          color: #e3f2fd;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background-color 0.3s;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .mobile-logout-btn {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .navbar-menu {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .mobile-menu {
            display: flex;
          }

          .navbar-container {
            height: auto;
            padding: 15px 20px;
          }

          .navbar-brand {
            flex: 1;
          }

          .tagline {
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 10px 15px;
          }

          .logo-text {
            font-size: 20px;
          }

          .logo-icon {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}