import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (user === "Sienna" && pass === "Sienna1234") {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "/dashboard";
    } else {
      alert("Identifiants incorrects");
    }
  }

  return (
    <div className="login-container">
      <h2>Connexion</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Utilisateur"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          placeholder="Mot de passe"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
