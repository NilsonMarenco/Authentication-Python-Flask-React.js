import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Usa useNavigate para obtener la función de navegación

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://expert-zebra-pjrrrvj9r4wvc6qgg-3001.app.github.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setMessage("Usuario registrado exitosamente");
        navigate("/"); 
      } else {
        setMessage("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error de red");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};


