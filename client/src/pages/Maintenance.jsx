import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Maintenance() {
  const [zonesIncendie, setZonesIncendie] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3001/api/surveillance/incendies-count")
      .then(res => setZonesIncendie(res.data.total_incendies || 0))
      .catch(err => console.error("Erreur incendies :", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Maintenance</h1>

        <div className="card">
          <p>Zones en incendie :</p>
          <p className="stat">{zonesIncendie}</p>
        </div>
      </div>
    </>
  );
}
