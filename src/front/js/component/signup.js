import React, { useState } from 'react';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar datos de registro al backend
    fetch('https://scaling-giggle-x5www65x5wq52wq9-3001.app.github.dev/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        if (response.ok) {
          // Redirigir al usuario a la página de inicio de sesión
          window.location.href = '/login';
        } else {
          // Manejar errores de registro
        }
      })
      .catch(error => {
        console.error('Error during signup:', error);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

