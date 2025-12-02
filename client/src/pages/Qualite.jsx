import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Qualite() {
  const [articlesCorrects, setArticlesCorrects] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3001/api/articles/correct-count")
      .then(res => setArticlesCorrects(res.data.total_correct))
      .catch(err => console.error("Erreur chargement :", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Qualité</h1>

        <div className="card">
          <p>Articles avec emballage correct :</p>
          <p className="stat">{articlesCorrects}</p>
        </div>
      </div>
    </>
  );
}
